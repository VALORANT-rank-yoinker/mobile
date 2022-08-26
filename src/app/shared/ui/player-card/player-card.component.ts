import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from 'src/app/shared/interfaces/data.interface';
import { NUM_TO_RANK_LUT } from '../../util/constants';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerCardComponent {
  @Input() data: Player;

  constructor() {}

  numToRank(num: number) {
    return NUM_TO_RANK_LUT[num];
  }
}
