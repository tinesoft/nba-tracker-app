import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Team } from '@shared/models';
import { TeamGamesSummaryComponent } from '@teams/team-games-summary/team-games-summary.component';

@Component({
  standalone: true,
  selector: 'nbat-teams-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ CommonModule, TeamGamesSummaryComponent],

  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {

  @Input()
  teams: Team[] | null = [];

  @Output()
  removeTeam= new EventEmitter<Team>();

  constructor() { }

  ngOnInit() {
  }

  trackByTeamId(index: number, team: Team){
    return team.id;
  }
  

  onRemoveTeam(team: Team){
    this.removeTeam.emit(team);
  }

}