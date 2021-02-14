import { TeamInterface } from './team.interface';
import { PlayerInterface } from './player.interface';

export interface SubstitutionInterface {
  minute: number;
  team: TeamInterface;
  playerOut: PlayerInterface;
}
