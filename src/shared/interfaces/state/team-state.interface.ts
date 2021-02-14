import { TeamInterface } from '../api/team.interface';

export interface TeamStateTeamInterface extends TeamInterface {
  competitionIds?: number[];
}

export interface TeamStateInterface {
  loader: boolean;
  teams: {[id: string]: TeamStateTeamInterface };

}
