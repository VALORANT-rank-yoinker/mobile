import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, merge, skip, tap } from 'rxjs';
import { StorageService } from 'src/app/shared/data-access/storage.service';

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
    private storage: StorageService
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
    const formUpdate$ = this.storage.getAsObservable('server').pipe(
      tap((server) => this.serverForm.patchValue(server)),
      tap((server) => console.log(`[ServerPage]: Retrieve data ${server}`))
    );

    const storageUpdate$ = this.serverForm.valueChanges.pipe(
      skip(1),
      distinctUntilChanged(),
      tap((_) => this.save())
    );

    merge(formUpdate$, storageUpdate$).pipe(untilDestroyed(this)).subscribe();
  }

  save() {
    if (this.serverForm.valid) {
      console.log(`[ServerPage]: Saving data ${this.serverForm.value}`);
      this.storage.set('server', this.serverForm.value);
    }
  }
}
