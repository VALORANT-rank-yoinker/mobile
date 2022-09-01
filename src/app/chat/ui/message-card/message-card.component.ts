import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getAgentImageByName } from 'src/app/shared/util/val-api';
import { ChatMessage } from '../../data-access/chat.interface';

const FALLBACK_AGENT_IMAGE = '../../../assets/webp/val.webp';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageCardComponent {
  @Input() msg: ChatMessage;
  @Input() edge: 'left' | 'right' = 'left';

  constructor() {}

  agentImage(agent: string) {
    return getAgentImageByName(agent) || FALLBACK_AGENT_IMAGE;
  }

  formatSender(player: string, agent: string) {
    if (player && agent) {
      return `${player} (${agent})`;
    } else if (player) {
      return player;
    } else {
      return agent;
    }
  }
}
