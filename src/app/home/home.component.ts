import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@core/services/api.service';
import { Team } from '@shared/models';
import { TeamSelectorComponent } from '@teams/team-selector/team-selector.component';
import { TeamsListComponent } from '@teams/teams-list/teams-list.component';
import { TrackingService } from '@core/services/tracking.service';

@Component({
  selector: 'nbat-home',
  standalone: true,
  imports: [
    CommonModule,
    TeamSelectorComponent,
    TeamsListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  teams$ = this.api.getTeams();
  trackedTeams$=  this.trackingService.trackedTeams$;

  constructor(private api: ApiService, private trackingService: TrackingService) { }

  ngOnInit() { }

  onTrackTeam(team: Team) {
    this.trackingService.trackTeam(team);
  }

  onUntrackTeam(team: Team) {
    this.trackingService.untrackTeam(team);
  }
}
