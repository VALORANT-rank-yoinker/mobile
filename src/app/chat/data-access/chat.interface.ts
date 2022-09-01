import { VryMessage } from 'src/app/shared/data-access/vry-link.service';

export interface ChatMessage extends VryMessage {
  time: number;
  player?: string;
  agent: string;
  text: string;
  message?: string;
  group: string;
  puuid: string;
  self: boolean;
}
