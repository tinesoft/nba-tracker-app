import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Team } from '@shared/models';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'nbat-team-selector[teams]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,

  imports: [CommonModule, MatSelectModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.scss']
})
export class TeamSelectorComponent implements OnInit {
  teamControl = new FormControl<Team | null>(null);

  @Input()
  teams: Team[] | null = [];

  @Output()
  teamSelected = this.teamControl.valueChanges;

  @Output()
  trackTeam = new EventEmitter<Team>();

  constructor() { }

  ngOnInit() { }

  onTrackTeam() {
    this.teamControl.value && this.trackTeam.emit(this.teamControl.value);
  }
}
