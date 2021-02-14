import { CompetitionInterface } from '../api/competition.interface';

export interface CompetitionStateInterface {
  competitions: CompetitionInterface[];
  search: string;
  loader: boolean;
}
