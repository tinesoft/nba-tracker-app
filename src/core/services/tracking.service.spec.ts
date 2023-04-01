import { TestBed } from '@angular/core/testing';
import { Team } from '@shared/models';

import { TrackingService } from './tracking.service';

describe('TrackingService', () => {
  let service: TrackingService;

  beforeEach(() => {
    service = new TrackingService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should track given team if not yet tracked and notify trackedTeams$ subscribers', () => {
    const team: Team = {
      id: 1,
      abbreviation: "ATL",
      city: "Atlanta",
      conference: "East",
      division: "Southeast",
      full_name: "Atlanta Hawks",
      name: "Hawks"
    };

    let trackedTeams = null;
    service.trackedTeams$.subscribe(teams => {
      trackedTeams = teams;
    })

    expect(service.lastTrackedTeam).toBeNull();

    service.trackTeam(team);

    expect(service.lastTrackedTeam).toBe(team);
    expect(trackedTeams).toBeTruthy();
    expect(trackedTeams).toContain(team);
  });

  it('should not track a team if already tracked nor notify trackedTeams$ subscribers', () => {
    const team: Team = {
      id: 1,
      abbreviation: "ATL",
      city: "Atlanta",
      conference: "East",
      division: "Southeast",
      full_name: "Atlanta Hawks",
      name: "Hawks"
    };

    let trackedTeams!: Team[];
    service.trackedTeams$.subscribe(teams => {
      trackedTeams = teams;
    });

    service.trackTeam(team);
    service.trackTeam(team);

    expect(service.lastTrackedTeam).toBe(team);
    expect(trackedTeams).toBeTruthy();
    expect(trackedTeams).toContain(team);
    expect(trackedTeams?.length).toBe(1);
  });

  it('should untrack given team and notify trackedTeams$ subscribers', () => {
    const team1: Team = {
      id: 1,
      abbreviation: "ATL",
      city: "Atlanta",
      conference: "East",
      division: "Southeast",
      full_name: "Atlanta Hawks",
      name: "Hawks"
    };
    const team2: Team = {
      id: 2,
      abbreviation: "BOS",
      city: "Boston",
      conference: "East",
      division: "Atlantic",
      full_name: "Boston Celtics",
      name: "Celtics"
    }

    let trackedTeams!: Team[];
    service.trackedTeams$.subscribe(teams => {
      trackedTeams = teams;
    });

    service.trackTeam(team1);
    service.trackTeam(team2);


    expect(service.lastTrackedTeam).toBe(team2);
    expect(trackedTeams).toBeTruthy();
    expect(trackedTeams).toContain(team1);
    expect(trackedTeams).toContain(team2);
    expect(trackedTeams?.length).toBe(2);

    service.untrackTeam(team1);

    expect(service.lastTrackedTeam).toBe(team2);
    expect(trackedTeams).toBeTruthy();
    expect(trackedTeams).not.toContain(team1);
    expect(trackedTeams).toContain(team2);
    expect(trackedTeams?.length).toBe(1);

  });

});
