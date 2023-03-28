import { Injectable } from '@angular/core';
import { Game, GameStats, Team } from '@shared/models';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class GameService {
  constructor() { }

  getGameStatsOfTeam(games: Game[], team: Team): GameStats {
    const { results, totalScoredPoints, totalConcededPoints } = games.reduce(
      (stats, currentGame) => {
        const isHomeTeam = currentGame.home_team.id === team.id;
        return {
          results: [
            ...stats.results,
            this.getGameResult(currentGame, team)
          ],
          totalScoredPoints:
            stats.totalScoredPoints +
            (isHomeTeam
              ? currentGame.home_team_score
              : currentGame.visitor_team_score),
          totalConcededPoints:
            stats.totalConcededPoints +
            (isHomeTeam
              ? currentGame.visitor_team_score
              : currentGame.home_team_score),
        };
      },
      {
        results: [],
        totalScoredPoints: 0,
        totalConcededPoints: 0,
      } as Pick<GameStats, 'results' | 'totalScoredPoints' | 'totalConcededPoints'>
    );

    return {
      results,
      totalScoredPoints,
      totalConcededPoints,
      avgScoredPoints: games.length ? Math.floor(totalScoredPoints / games.length) : 0,
      avgConcededPoints: games.length ? Math.floor(totalConcededPoints / games.length) : 0,
    }
  }

   getGameDates(nbPastDays: number) {
    const gameDates = [];
    const today = new Date();
    for (let i = 0; i <= nbPastDays; i++) {
      gameDates.push(new Date(new Date().setDate(today.getDate() - i)).toISOString().split("T")[0]);
    }
    return gameDates;
  }

  private getGameResult(game: Game, team: Team): 'W' | 'L' {
    const isHomeTeamWinning = game.home_team_score > game.visitor_team_score;
    const isHomeTeam = game.home_team.id === team.id;

    if (isHomeTeam)
      return isHomeTeamWinning ? 'W' : 'L';

    return 'L';
  }
}
