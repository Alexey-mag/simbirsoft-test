export interface ScoreInterface {
  winner: string;
  duration: string;
  fullTime: {
    homeTeam: number;
    awayTeam: number;
  };
  halfTime: {
    homeTeam: number;
    awayTeam: number;
  };
  extraTime: {
    homeTeam: number;
    awayTeam: number;
  };
  penalties: {
    homeTeam: number;
    awayTeam: number;
  };
}
