import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { Team } from '@shared/models';
import { Observable } from 'rxjs';

export const teamResolver: ResolveFn<Observable<Team>> = (route, state) => {
  const apiService = inject(ApiService);
  const id = route.paramMap.get('id')!;

  return apiService.getTeamById(+id)
};
