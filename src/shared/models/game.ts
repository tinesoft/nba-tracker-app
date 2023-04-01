import { Team } from './team';

export interface Game {
  id: number;
  date: string;
  home_team: Team;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string; //Final,
  time: string; //Final,
  visitor_team: Team;
  visitor_team_score: number;
}
