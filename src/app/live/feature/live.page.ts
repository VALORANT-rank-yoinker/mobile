import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, map, Observable, Subject } from 'rxjs';
import { VryLinkService } from 'src/app/shared/data-access/vry-link.service';
import {
  HeartbeatMessage,
  Player,
} from 'src/app/shared/interface/heartbeat.interface';
import { PlayerInfoModalComponent } from 'src/app/shared/ui/player-info-modal/player-info-modal.component';

const TEAM_FILTERS = ['All', 'Blue', 'Red'] as const;
type TeamFilter = typeof TEAM_FILTERS[number];

@UntilDestroy()
@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LivePage {
  refresh$ = new Subject();
  teamFilters = TEAM_FILTERS;
  teamFilter$ = new BehaviorSubject<TeamFilter>('All');

  heartbeat$: Observable<HeartbeatMessage>;
  players$: Observable<Player[]>;

  constructor(
    private vryLink: VryLinkService,
    private modalctrl: ModalController
  ) {
    this.heartbeat$ = this.vryLink.getMessagesOfType('heartbeat');
    this.players$ = combineLatest([this.heartbeat$, this.teamFilter$]).pipe(
      map(([hb, filter]) =>
        Object.values(hb.players)
          .filter((p) => (filter === 'All' ? true : p.team === filter))
          .sort(this.sortByTeam)
      )
    );
  }

  sortByTeam = (a: Player, b: Player): number =>
    a.team && a.team ? a.team.localeCompare(b.team) : 0;

  trackByPuuid(index: number, player: Player) {
    return player.puuid;
  }

  async showMoreInfo(player: Player) {
    const modal = await this.modalctrl.create({
      component: PlayerInfoModalComponent,
      cssClass: 'player-info-modal',
      componentProps: { player },
      breakpoints: [0, 0.75],
      initialBreakpoint: 0.75,
      showBackdrop: true,
      backdropDismiss: true,
    });

    modal.present();
  }

  async doRefresh(event: any) {
    this.vryLink.refresh();
    event.target.complete();
  }
}
