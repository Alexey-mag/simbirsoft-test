import { TeamInterface } from './team.interface';
import { PlayerInterface } from './player.interface';

export interface GoalInterface {
  minute: number;
  type: string;
  team: TeamInterface;
  scorer: PlayerInterface;
  assist: PlayerInterface;
}
