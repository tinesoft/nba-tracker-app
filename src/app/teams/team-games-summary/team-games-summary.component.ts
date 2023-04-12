import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '@core/services/api.service';
import { GameService } from '@core/services/game.service';
import { GameStats, Team } from '@shared/models';
import { ConferencePipe } from '@shared/pipes/conference.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,

  selector: 'nbat-team-games-summary[team]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ConferencePipe,
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],

  templateUrl: './team-games-summary.component.html',
  styleUrls: ['./team-games-summary.component.scss'],
})
export class TeamGamesSummaryComponent implements OnInit {
  private api = inject(ApiService);
  private gameService = inject(GameService);
  
  @Input()
  team!: Team;
  
  @Output()
  removeTeam = new EventEmitter<Team>();

  gameStats$!: Observable<GameStats>;
  nbDays = 12;


  ngOnInit() {
    this.gameStats$ = this.api
      .getTeamResults(this.team.id, this.gameService.getGameDates(this.nbDays))
      .pipe(
        map((games) => this.gameService.getGameStatsOfTeam(games, this.team))
      );
  }

  onRemoveTeam() {
    this.removeTeam.emit(this.team);
  }
}
