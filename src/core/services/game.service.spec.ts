import { TestBed } from '@angular/core/testing';
import { Game, Team } from '@shared/models';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it("should compute games stats for appropriate team", () => {

    const games: Game[] = [
      {
        id: 11139,
        date: "2000-11-01T00:00:00.000Z",
        home_team: {
          id: 6,
          abbreviation: "CLE",
          city: "Cleveland",
          conference: "East",
          division: "Central",
          full_name: "Cleveland Cavaliers",
          name: "Cavaliers"
        },
        home_team_score: 102,
        period: 4,
        postseason: false,
        season: 2000,
        status: "Final",
        time: " ",
        visitor_team: {
          id: 26,
          abbreviation: "SAC",
          city: "Sacramento",
          conference: "West",
          division: "Pacific",
          full_name: "Sacramento Kings",
          name: "Kings"
        },
        visitor_team_score: 100
      },
      {
        id: 11539,
        date: "2000-10-31T00:00:00.000Z",
        home_team: {
          id: 5,
          abbreviation: "CHI",
          city: "Chicago",
          conference: "East",
          division: "Central",
          full_name: "Chicago Bulls",
          name: "Bulls"
        },
        home_team_score: 81,
        period: 4,
        postseason: false,
        season: 2000,
        status: "Final",
        time: " ",
        visitor_team: {
          id: 26,
          abbreviation: "SAC",
          city: "Sacramento",
          conference: "West",
          division: "Pacific",
          full_name: "Sacramento Kings",
          name: "Kings"
        },
        visitor_team_score: 100
      },
      {
        id: 473363,
        date: "2021-10-04T00:00:00.000Z",
        home_team: {
          id: 26,
          abbreviation: "SAC",
          city: "Sacramento",
          conference: "West",
          division: "Pacific",
          full_name: "Sacramento Kings",
          name: "Kings"
        },
        home_team_score: 117,
        period: 4,
        postseason: false,
        season: 2021,
        status: "Final",
        time: "",
        visitor_team: {
          id: 24,
          abbreviation: "PHX",
          city: "Phoenix",
          conference: "West",
          division: "Pacific",
          full_name: "Phoenix Suns",
          name: "Suns"
        },
        visitor_team_score: 106
      }
    ];


    const team: Team = {
      id: 26,
      abbreviation: "SAC",
      city: "Sacramento",
      conference: "West",
      division: "Pacific",
      full_name: "Sacramento Kings",
      name: "Kings"
    };

    let gameStats = service.getGameStatsOfTeam(games, team);


    expect(gameStats.results).toEqual(['L','W', 'W']);
    expect(gameStats.avgScoredPoints).toEqual(105);
    expect(gameStats.avgConcededPoints).toEqual(96);
  });
});
