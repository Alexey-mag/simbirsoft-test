import { TeamInterface } from './team.interface';
import { PlayerInterface } from './player.interface';

export interface BookingInterface {
  minute: number;
  team: TeamInterface;
  player: PlayerInterface;
  card: string;
}
