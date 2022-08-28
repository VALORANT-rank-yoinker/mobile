import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, Subject } from 'rxjs';
import { VryLinkService } from 'src/app/shared/data-access/vry-link.service';
import {
  HeartbeatMessage,
  Player,
} from 'src/app/shared/interface/heartbeat.interface';

@UntilDestroy()
@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LivePage {
  refresh$ = new Subject();

  data$: Observable<HeartbeatMessage>;

  constructor(private vryLink: VryLinkService) {
    this.data$ = this.vryLink.getMessagesOfType('heartbeat');
  }

  orderByTeam = (
    a: KeyValue<string, Player>,
    b: KeyValue<string, Player>
  ): number =>
    a.value.team && a.value.team ? a.value.team.localeCompare(b.value.team) : 0;

  async doRefresh(event: any) {
    this.vryLink.refresh();
    event.target.complete();
  }
}
