import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { filter, Subject } from 'rxjs';
import { VryLinkService } from 'src/app/shared/data-access/vry-link.service';
import { MatchData, Player } from 'src/app/shared/interfaces/data.interface';

@UntilDestroy()
@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LivePage {
  refresh$ = new Subject();

  data$ = this.vryLink.messages$.pipe(
    filter((x: MatchData) => x.type === 'heartbeat')
  );

  constructor(private vryLink: VryLinkService) {}

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
