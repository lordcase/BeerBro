import { createAction, props } from '@ngrx/store';
import { Brewery } from './breweries.reducer';

export const saveCurrentPage = createAction(
  '[Breweries] Save current page',
  props<{ page: number }>()
);

export const toggleFavorites = createAction(
  '[Breweries] Add to favourites',
  props<{ brewery: Brewery }>()
);

export const loadBreweriesPage = createAction(
  '[Breweries] Load breweries page',
  props<{ page: number }>()
);

export const loadBreweriesPageSuccess = createAction(
  '[Breweries] Load breweries page success',
  props<{ breweriesPage: any }>()
);

export const loadBreweriesPageFailure = createAction(
  '[Breweries] Load breweries page failure',
  props<{ error: string }>()
);

export const loadBrewery = createAction(
  '[Breweries] Load breweries page',
  props<{ id: string }>()
);

export const loadBrewerySuccess = createAction(
  '[Breweries] Load breweries page success',
  props<{ brewery: Brewery }>()
);

export const loadBreweryFailure = createAction(
  '[Breweries] Load breweries page failure',
  props<{ error: string }>()
);
