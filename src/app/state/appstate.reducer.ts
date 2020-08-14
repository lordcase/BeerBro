import { createReducer, on, createSelector } from '@ngrx/store';
import * as AppActions from './appstate.actions';

export interface FeatureState {
  counter: number;
}

export interface AppState {
  favourites: FeatureState;
}
export const initialState: AppState = {
  favourites: { counter: 1 },
};

export const selectFavourites = (state: AppState) => state.favourites;

export const getFavourites = createSelector(
  selectFavourites,
  (state: FeatureState) => state.counter
);

const _appState = createReducer(
  initialState,
  on(AppActions.toggleFavorites, (state, { brewery }) => {
    const newFavourites = { ...state.favourites };
    if (Object.keys(state.favourites).includes('' + brewery.id)) {
      delete newFavourites[brewery.id];
    } else {
      newFavourites[brewery.id] = brewery;
    }
    return {
      ...state,
      favourites: newFavourites,
      modified: true,
    };
  })
);

export function appState(state, action) {
  return _appState(state, action);
}
