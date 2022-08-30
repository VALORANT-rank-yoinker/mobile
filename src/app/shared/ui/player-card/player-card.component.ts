import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Player } from '../../interface/heartbeat.interface';
import { NUM_TO_RANK_LUT } from '../../util/constants';
import { getAgentImageByName } from '../../util/val-api';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerCardComponent {
  @Input() data: Player;
  @Output() moreInfo = new EventEmitter<boolean>();
  getAgentImage = getAgentImageByName;

  constructor() {}

  numToRank(num: number) {
    return NUM_TO_RANK_LUT[num];
  }
}
