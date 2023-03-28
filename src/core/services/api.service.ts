import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Team, Game, ApiResult as ApiPaginatedResult } from '@shared/models';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTeams(page = 0, count = 25): Observable<Team[]> {
    const { params } = this.getPaginationParams(page, count);
    const { headers } = this.getAuthicationHeaders();

    const options = {
      headers,
      params,
    };

    return this.http
      .get<ApiPaginatedResult<Team[]>>(`${this.baseUrl}/teams`, options)
      .pipe(map((result) => result.data));
  }

  getTeamResults(teamId: number, gameDates: string[] = [], seasons: number[] = [], page = 0, count = 25) {
    const { params: paginationParams } = this.getPaginationParams(page, count);
    const { headers } = this.getAuthicationHeaders();

    const options = {
      headers,
      params: {
        ...paginationParams,
        'seasons[]': seasons,
        'dates[]': gameDates,
        'team_ids[]': [teamId],
      },
    };

    return this.http
      .get<ApiPaginatedResult<Game[]>>(`${this.baseUrl}/games`, options)
      .pipe(map((result) => result.data));
  }

  getTeamById(teamId: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/teams/${teamId}`, this.getAuthicationHeaders());
  }

  private getPaginationParams(page: number, per_page: number) {
    return {
      params: {
        page,
        per_page,
      },
    };
  }
  private getAuthicationHeaders() {
    return {
      headers: environment.apiHeaders,
    };
  }
}
