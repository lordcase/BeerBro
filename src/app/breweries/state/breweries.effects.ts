import { Injectable } from '@angular/core';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { BreweryService } from '../shared/brewery.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BreweriesActions from './breweries.actions';

@Injectable()
export class BreweriesEffects {
  constructor(
    private actions$: Actions,
    private breweryService: BreweryService
  ) {}

  loadBreweriesPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BreweriesActions.loadBreweriesPage),
      mergeMap((action) =>
        this.breweryService.getBreweries(action.page).pipe(
          map((breweries) =>
            BreweriesActions.loadBreweriesPageSuccess({
              breweriesPage: breweries,
            })
          )
        )
      )
    );
  });
}
