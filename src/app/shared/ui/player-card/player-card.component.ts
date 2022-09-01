import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Player } from '../../interface/heartbeat.interface';
import { NUM_TO_RANK_LUT } from '../../util/constants';
import { getAgentImageByName } from '../../util/val-api';

const FALLBACK_AGENT_IMAGE = '../../../assets/webp/val.webp';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  standalone: true,
  imports: [CommonModule,IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerCardComponent {
  @Input() player: Player;
  @Output() moreInfo = new EventEmitter<boolean>();

  constructor() {}

  numToRank(num: number) {
    return NUM_TO_RANK_LUT[num];
  }

  agentImage(player: Player) {
    return (
      getAgentImageByName(player.agent) ||
      player.agentImgLink ||
      FALLBACK_AGENT_IMAGE
    );
  }
}
