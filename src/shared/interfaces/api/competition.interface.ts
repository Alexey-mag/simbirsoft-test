import { SeasonInterface } from './season.interface';
import { AreaInterface } from './area.interface';

export interface CompetitionInterface {
  id: number;
  area?: AreaInterface;
  name: string;
  plan?: string;
  currentSeason?: SeasonInterface;
  emblemUrl?: string;
  seasons?: SeasonInterface[];
  lastUpdated?: Date;
}
