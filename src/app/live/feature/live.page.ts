import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, Subject } from 'rxjs';
import { VryLinkService } from 'src/app/shared/data-access/vry-link.service';
import {
  HeartbeatMessage,
  Player,
} from 'src/app/shared/interface/heartbeat.interface';
import { PlayerInfoModalComponent } from 'src/app/shared/ui/player-info-modal/player-info-modal.component';

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

  constructor(
    private vryLink: VryLinkService,
    private modalctrl: ModalController
  ) {
    this.data$ = this.vryLink.getMessagesOfType('heartbeat');
  }

  orderByTeam = (
    a: KeyValue<string, Player>,
    b: KeyValue<string, Player>
  ): number =>
    a.value.team && a.value.team ? a.value.team.localeCompare(b.value.team) : 0;

  trackByPuuid(index: number, player: KeyValue<string, Player>) {
    return player.value.puuid;
  }

  async showMoreInfo(player: Player) {
    const modal = await this.modalctrl.create({
      component: PlayerInfoModalComponent,
      componentProps: { player },
      cssClass: 'player-info-modal',
      backdropDismiss: true,
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.75],
    });

    modal.present();
  }

  async doRefresh(event: any) {
    this.vryLink.refresh();
    event.target.complete();
  }
}
