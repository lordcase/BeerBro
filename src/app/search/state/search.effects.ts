import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { BreweryService } from '../../breweries/shared/brewery.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SearchActions from './search.actions';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchService: BreweryService
  ) {}

  loadSearchPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchActions.loadTypeahead),
      mergeMap((action) =>
        this.searchService.search(action.term).pipe(
          map((results) => {
            return SearchActions.loadTypeaheadSuccess({ results });
          })
        )
      )
    );
  });
}
