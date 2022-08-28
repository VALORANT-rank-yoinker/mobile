import { VryMessage } from 'src/app/shared/data-access/vry-link.service';

export interface ChatMessage extends VryMessage {
  player?: string;
  agent: string;
  message: string;
  chatType: string;
  puuid: string;
  self: boolean;
}
