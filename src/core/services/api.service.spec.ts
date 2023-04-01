import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { environment } from '@environment/environment';

describe('ApiService', () => {
  let service: ApiService;
  let ctrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ApiService);
    ctrl = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    ctrl.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should have appropriate authentication headers', () => {

    service.getTeams().subscribe();
    const req = ctrl.expectOne(
      request => request.headers.get('X-RapidAPI-Key') === environment.apiHeaders['X-RapidAPI-Key'] && request.headers.get('X-RapidAPI-Host') === environment.apiHeaders['X-RapidAPI-Host']
    );
  });

  it('should fetch all teams', () => {
    const page = 1;
    const count = 5;

    const result = {
      data: [
        {
          id: 1,
          abbreviation: "ATL",
          city: "Atlanta",
          conference: "East",
          division: "Southeast",
          full_name: "Atlanta Hawks",
          name: "Hawks"
        },
        {
          id: 2,
          abbreviation: "BOS",
          city: "Boston",
          conference: "East",
          division: "Atlantic",
          full_name: "Boston Celtics",
          name: "Celtics"
        }
      ],
      meta: {
        total_pages: 23,
        current_page: page,
        next_page: page + 1,
        per_page: count,
        total_count: 45
      }
    };

    service.getTeams(page, count).subscribe(teams => {
      expect(teams).toEqual(result.data);
    });

    const req = ctrl.expectOne(`${environment.apiUrl}/teams?page=${page}&per_page=${count}`);
    expect(req.request.method).toEqual('GET');

    req.flush(result);
  });

  it('should fetch the specified team by id', () => {
    const teamId = 1;
    const result = {
      id: teamId,
      abbreviation: "ATL",
      city: "Atlanta",
      conference: "East",
      division: "Southeast",
      full_name: "Atlanta Hawks",
      name: "Hawks"
    };

    service.getTeamById(teamId).subscribe(team => {
      expect(team).toEqual(result);
    });

    const req = ctrl.expectOne(`${environment.apiUrl}/teams/${teamId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(result);
  });

  it('should fetch the games of the specified team', () => {
    const page = 1;
    const count = 5;
    const teamId = 2
    const gameDates = ['2022-12-06', '2022-12-07', '2022-12-08'];
    const seasons: number[] = [];

    const result = {
      data: [
        {
          id: 1,
          abbreviation: "ATL",
          city: "Atlanta",
          conference: "East",
          division: "Southeast",
          full_name: "Atlanta Hawks",
          name: "Hawks"
        },
        {
          id: 2,
          abbreviation: "BOS",
          city: "Boston",
          conference: "East",
          division: "Atlantic",
          full_name: "Boston Celtics",
          name: "Celtics"
        }
      ],
      meta: {
        total_pages: 23,
        current_page: page,
        next_page: page + 1,
        per_page: count,
        total_count: 45
      }
    }
      ;

    service.getTeamResults(teamId, gameDates, seasons, page, count).subscribe(games => {
      expect(games).toEqual(result.data);
    });

    const req = ctrl.expectOne(`${environment.apiUrl}/games?team_ids%5B%5D=${teamId}${gameDates.map(v => `&dates%5B%5D=${v}`).join('')}${seasons.map(v => `&seasons%5B%5D=${v}`).join('')}&page=${page}&per_page=${count}`);
    expect(req.request.method).toEqual('GET');

    req.flush(result);
  });
});
