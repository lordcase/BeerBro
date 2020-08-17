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
  brewery_type?: string;
  street?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  longitude?: string;
  latitude?: string;
  phone?: string;
  website_url?: string;
  updated_at?: string;
}

export interface BreweriesState {
  favourites: Brewery[];
  breweriesPage: Brewery[];
  currentPage: number;
  currentBrewery?: Brewery;
  error: string;
}
export const initialState: BreweriesState = {
  favourites: [],
  breweriesPage: [],
  currentPage: 1,
  error: '',
};

const getBreweriesFeatureState = createFeatureSelector<BreweriesState>(
  'breweries'
);

export const getCurrentPage = createSelector(
  getBreweriesFeatureState,
  (state) => state.currentPage
);
export const getError = createSelector(
  getBreweriesFeatureState,
  (state) => state.error
);
export const getFavourites = createSelector(
  getBreweriesFeatureState,
  (state) => state.favourites
);

export const getBreweriesPage = createSelector(
  getBreweriesFeatureState,
  (state) => state.breweriesPage
);
export const getCurrentBrewery = createSelector(
  getBreweriesFeatureState,
  (state) => state.currentBrewery
);
// export const getFavouriteness = createSelector(
//   getBreweriesFeatureState,
//   (state) => {
//     console.log('hopp');
//     return (
//       state.currentBrewery &&
//       state.currentBrewery.id &&
//       Object.values(state.favourites)
//         .map((value) => value['id'])
//         .includes(state.currentBrewery.id)
//     );
//   }
// );
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
    BreweriesActions.saveCurrentPage,
    (state, action): BreweriesState => ({ ...state, currentPage: action.page })
  ),
  on(
    BreweriesActions.loadBreweriesPageSuccess,
    (state, action): BreweriesState => {
      return {
        ...state,
        breweriesPage: action.breweriesPage,
      };
    }
  ),
  on(
    BreweriesActions.loadBreweriesPageFailure,
    (state, action): BreweriesState => {
      return {
        ...state,
        breweriesPage: [],
        error: action.error,
      };
    }
  ),
  on(
    BreweriesActions.loadBrewerySuccess,
    (state, action): BreweriesState => {
      return {
        ...state,
        currentBrewery: action.brewery,
      };
    }
  ),
  on(
    BreweriesActions.loadBreweryFailure,
    (state, action): BreweriesState => {
      return {
        ...state,
        breweriesPage: [],
        error: action.error,
      };
    }
  )
);

export function BreweriesReducer(state, action) {
  return _BreweriesReducer(state, action);
}
