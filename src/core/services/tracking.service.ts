import { Injectable } from '@angular/core';
import { Team } from '@shared/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private _trackedTeams$ = new BehaviorSubject<Team[]>([]);
  private _lastTrackedTeam:Team|null = null;

  constructor() { }

  get trackedTeams$(): Observable<Team[]> {
    return this._trackedTeams$.asObservable();
  }

  get lastTrackedTeam(): Team| null{
    return this._lastTrackedTeam;
  }


  trackTeam(team: Team) {
    if(!this._trackedTeams$.getValue().some(t => t.id === team.id)){
      this._lastTrackedTeam = team;
      this._trackedTeams$.next([...this._trackedTeams$.getValue(), team]);
    }
  }

  untrackTeam(team: Team) {
    this._trackedTeams$.next([...this._trackedTeams$.getValue().filter(t => t.id !== team.id)]);
  }
}
