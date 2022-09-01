import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { Player } from '../../interface/heartbeat.interface';
import { getTierInfoByTierNumber } from '../../util/val-api';

@Component({
  selector: 'app-player-info-modal',
  templateUrl: './player-info-modal.component.html',
  styleUrls: ['./player-info-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, SwiperModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInfoModalComponent {
  player: Player;
  getTierInfo = getTierInfoByTierNumber;

  constructor() {}

  get weapons() {
    return Object.values(this.player?.weapons || {}).filter(
      (w) => !['Standard', 'Melee'].some((e) => w.skinDisplayName.includes(e))
    );
  }
}
