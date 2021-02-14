import { AreaInterface } from './area.interface';
import { PlayerInterface } from './player.interface';
import { MatchInterface } from './match.interface';

export interface TeamInterface {
  id: number;
  area?: AreaInterface;
  name: string;
  shortName?: string;
  tla?: string;
  crestUrl?: string;
  address?: string;
  phone?: string;
  website?: string;
  email?: string;
  founded?: number;
  clubColors?: string;
  venue?: string;
  lastUpdated?: Date;
  squad?: PlayerInterface[];
  coach?: PlayerInterface;
  captain?: PlayerInterface;
  lineup?: PlayerInterface[];
  bench?: PlayerInterface[];
  matches?: MatchInterface[];
}
