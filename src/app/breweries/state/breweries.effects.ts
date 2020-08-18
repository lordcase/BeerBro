import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { BreweryService } from '../shared/brewery.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BreweriesActions from './breweries.actions';
import { of } from 'rxjs';

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
          ),
          catchError((error) =>
            of(BreweriesActions.loadBreweriesPageFailure({ error }))
          )
        )
      )
    );
  });
  loadBrewery$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BreweriesActions.loadBrewery),
      mergeMap((action) =>
        this.breweryService.getBrewery(+action.id).pipe(
          map((brewery) =>
            BreweriesActions.loadBrewerySuccess({
              brewery,
            })
          )
        )
      )
    );
  });
  loadFreeSearchPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BreweriesActions.loadFreeSearchPage),
      mergeMap((action) =>
        this.breweryService.freeSearch(action.searchTerm).pipe(
          map((breweries) => {
            BreweriesActions.setResultCount({
              resultCount: breweries.length,
            });
            return BreweriesActions.loadFreeSearchPageSuccess({
              result: breweries,
            });
          }),
          catchError((error) =>
            of(BreweriesActions.loadFreeSearchPageFailure({ error }))
          )
        )
      )
    );
  });
}
