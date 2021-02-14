import { PlayerInterface } from '../api/player.interface';

export interface PlayerStateInterface {
  players: {[teamId: number]: PlayerInterface[] };
}
