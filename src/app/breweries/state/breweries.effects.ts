import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { BreweryService } from '../shared/brewery.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BreweriesActions from './breweries.actions';
import { of } from 'rxjs';
import { setLoadingFlagAction } from 'app/state/app.state';
import { Store } from '@ngrx/store';

@Injectable()
export class BreweriesEffects {
  constructor(
    private actions$: Actions,
    private breweryService: BreweryService,
    private store: Store
  ) {}

  loadBreweriesPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BreweriesActions.loadBreweriesPage),
      tap(() => this.store.dispatch(setLoadingFlagAction({ flag: true }))),
      mergeMap((action) =>
        this.breweryService.getBreweries(action.page).pipe(
          map((breweries) => {
            this.store.dispatch(setLoadingFlagAction({ flag: false }));
            return BreweriesActions.loadBreweriesPageSuccess({
              breweriesPage: breweries,
            });
          }),
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
      tap(() => this.store.dispatch(setLoadingFlagAction({ flag: true }))),
      mergeMap((action) =>
        this.breweryService.getBrewery(+action.id).pipe(
          map((brewery) => {
            this.store.dispatch(setLoadingFlagAction({ flag: false }));
            return BreweriesActions.loadBrewerySuccess({
              brewery,
            });
          })
        )
      )
    );
  });
  loadFreeSearchPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BreweriesActions.loadFreeSearchPage),
      tap(() => this.store.dispatch(setLoadingFlagAction({ flag: true }))),
      mergeMap((action) =>
        this.breweryService.freeSearch(action.searchTerm).pipe(
          map((breweries) => {
            BreweriesActions.setResultCount({
              resultCount: breweries.length,
            });
            this.store.dispatch(setLoadingFlagAction({ flag: false }));
            return BreweriesActions.loadFreeSearchPageSuccess({
              result: breweries,
            });
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingFlagAction({ flag: true }));
            return of(BreweriesActions.loadFreeSearchPageFailure({ error }));
          })
        )
      )
    );
  });
}
