import { VryMessage } from 'src/app/shared/data-access/vry-link.service';

/* eslint-disable @typescript-eslint/naming-convention */
export interface Player {
  puuid: string;
  name: string;
  team?: string;
  sprays?: Record<string, Spray>;
  level?: number;
  title?: string | null;
  playerCard?: string;
  agent?: string;
  agentImgLink?: string;
  weapons?: Record<string, Weapon>;
  rank?: number;
  peakRank?: number;
  peakRankAct?: string;
  rr: number;
  partyNumber?: number;
  kd?: string;
  headshotPercentage?: string;
  winPercentage?: string;
}

export interface Spray {
  displayName: string;
  displayIcon: string;
  fullTransparentIcon: string;
}

export enum GameMode {
  'New Map' = 'newmap',
  'Competitive' = 'competetive',
  'Unrated' = 'unrated',
  'Spike Rush' = 'spikerush',
  'Deathmatch' = 'deathmatch',
  'Escalation' = 'escalation',
  'Replication' = 'replication',
  'Custom' = 'custom',
  'Snowball Fight' = 'snowballfight',
}

export interface HeartbeatMessage extends VryMessage {
  time: number;
  state: string;
  mode: GameMode;
  map?: string;
  puuid: string;
  players: Record<string, Player>;
}

export interface Weapon {
  skin_chroma: string;
  skin_buddy?: string;
  skin: string;
  skin_buddy_level?: string;
  skin_level: string;
  buddy_displayIcon?: string;
  weapon: string;
  skinDisplayName: string;
  skinDisplayIcon: string;
}
