import { SeasonInterface } from './season.interface';
import { TeamInterface } from './team.interface';
import { ScoreInterface } from './score.interface';
import { GoalInterface } from './goal.interface';
import { BookingInterface } from './booking.interface';
import { SubstitutionInterface } from './substitution.interface';
import { RefereeInterface } from './referee.interface';
import { CompetitionInterface } from './competition.interface';

export interface MatchInterface {
  id: number;
  competition?: CompetitionInterface;
  season: SeasonInterface;
  utcDate: Date;
  status: string;
  minute?: number;
  attendance: number;
  matchday: number;
  stage: string;
  group: string;
  lastUpdated: Date;
  homeTeam: TeamInterface;
  awayTeam: TeamInterface;
  score: ScoreInterface;
  goals: GoalInterface[];
  bookings: BookingInterface[];
  substitutions: SubstitutionInterface[];
  referees: RefereeInterface[];
}
