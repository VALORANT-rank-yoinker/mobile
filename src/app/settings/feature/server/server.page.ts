import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged, merge, skip, tap } from 'rxjs';
import { StorageService } from 'src/app/shared/data-access/storage.service';
import { VryLinkService } from 'src/app/shared/data-access/vry-link.service';

const IP_REGEX =
  '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';

const PORT_REGEX =
  '^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$';

@UntilDestroy()
@Component({
  selector: 'app-server',
  templateUrl: './server.page.html',
  styleUrls: ['./server.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerPage implements AfterViewInit {
  serverForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storage: StorageService,
    private vryLink: VryLinkService
  ) {
    this.serverForm = this.formBuilder.group({
      hostIp: [
        '192.168.29.40',
        Validators.compose([Validators.pattern(IP_REGEX), Validators.required]),
      ],
      port: [
        1100,
        Validators.compose([
          Validators.pattern(PORT_REGEX),
          Validators.required,
        ]),
      ],
    });
  }

  ngAfterViewInit(): void {
    const loadvalues$ = this.storage.getAsObservable('server').pipe(
      tap((server) => this.serverForm.patchValue(server)),
      tap((server) =>
        console.log(`[ServerPage]: Loading data ${JSON.stringify(server)}`)
      )
    );

    const updateValues$ = this.serverForm.valueChanges.pipe(
      skip(1),
      debounceTime(500),
      distinctUntilChanged(),
      tap((_) => {
        if (this.serverForm.valid) {
          this.save();
          this.vryLink.refresh();
        }
      })
    );

    merge(loadvalues$, updateValues$).pipe(untilDestroyed(this)).subscribe();
  }

  save() {
    console.log(
      `[ServerPage]: Saving data ${JSON.stringify(this.serverForm.value)}`
    );
    this.storage.set('server', this.serverForm.value);
  }
}
