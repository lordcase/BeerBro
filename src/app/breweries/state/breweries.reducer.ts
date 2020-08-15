import {
  createReducer,
  on,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as BreweriesActions from './breweries.actions';
import * as AppState from '../../state/app.state';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface State extends AppState.State {
  breweries: BreweriesState;
}

export interface Brewery {
  id: number;
  name: string;
}

export interface BreweriesState {
  favourites: Brewery[];
  breweriesPage: Brewery[];
  currentPage: number;
}
export const initialState: BreweriesState = {
  favourites: [],
  breweriesPage: [],
  currentPage: 1,
};

const getBreweriesFeatureState = createFeatureSelector<BreweriesState>(
  'breweries'
);

export const getCurrentPage = createSelector(
  getBreweriesFeatureState,
  (state) => state.currentPage
);
export const getFavourites = createSelector(
  getBreweriesFeatureState,
  (state) => state.favourites
);

export const getBreweriesPage = createSelector(
  getBreweriesFeatureState,
  (state) => state.breweriesPage
);

const _BreweriesReducer = createReducer<BreweriesState>(
  initialState,
  on(
    BreweriesActions.toggleFavorites,
    (state, { brewery }): BreweriesState => {
      const newFavourites = { ...state.favourites };
      if (Object.keys(state.favourites).includes('' + brewery.id)) {
        delete newFavourites[brewery.id];
      } else {
        newFavourites[brewery.id] = brewery;
      }
      return {
        ...state,
        favourites: newFavourites,
      };
    }
  ),
  on(
    BreweriesActions.loadBreweriesPageSuccess,
    (state, action): BreweriesState => {
      console.log('au', action);
      return {
        ...state,
        breweriesPage: action.breweriesPage,
      };
    }
  ),
  on(
    BreweriesActions.saveCurrentPage,
    (state, action): BreweriesState => ({ ...state, currentPage: action.page })
  )
);

export function BreweriesReducer(state, action) {
  return _BreweriesReducer(state, action);
}
