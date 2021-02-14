import { WinnerInterface } from './winner.interface';

export interface SeasonInterface {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  availableStages?: string[];
  winner: WinnerInterface;

}
