/* eslint-disable @typescript-eslint/naming-convention */
export interface Player {
  name: string;
  map?: string;
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
  rr?: number;
}

export interface Spray {
  displayName: string;
  displayIcon: string;
  fullTransparentIcon: string;
}

export interface MatchData {
  time: number;
  state: string;
  type: string;
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
