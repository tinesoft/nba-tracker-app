import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import { GameService } from '@core/services/game.service';
import { Game, Team } from '@shared/models';
import { ConferencePipe } from '@shared/pipes/conference.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  standalone: true,

  selector: 'nbat-team-games-details[team]',
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

  templateUrl: './team-games-details.component.html',
  styleUrls: ['./team-games-details.component.scss'],
})
export default class TeamGamesDetailsComponent implements OnInit {
  team!: Team;

  team$!: Team;
  games$!: Observable<Game[]>;

  nbDays = 12;

  constructor(private api: ApiService, private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.team = this.route.snapshot.data['team'];
    this.games$ = this.api
      .getTeamResults(this.team.id, this.gameService.getGameDates(this.nbDays));
  }

  trackByGameId(index: number, game: Game) {
    return game.id;
  }

}
