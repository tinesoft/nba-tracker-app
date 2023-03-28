import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { Team } from '@shared/models';
import { Observable } from 'rxjs';

import { teamResolver } from './team.resolver';

describe('teamResolver', () => {
  const executeResolver: ResolveFn<Observable<Team>> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => teamResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
