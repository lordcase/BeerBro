import {
  createReducer,
  on,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as SearchActions from './search.actions';
import * as AppState from '../../state/app.state';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface State extends AppState.State {
  search: SearchState;
}

export interface SearchState {
  typeahead: TypeaheadResult[];
  error: string;
}

export interface TypeaheadResult {
  id: string;
  name: string;
}

export const initialState: SearchState = {
  typeahead: [],
  error: '',
};

const getSearchFeatureState = createFeatureSelector<SearchState>('search');

export const getTypeaheadResults = createSelector(
  getSearchFeatureState,
  (state) => state.typeahead
);
export const getTypeaheadResultsCount = createSelector(
  getSearchFeatureState,
  (state) => state.typeahead.length
);

const _SearchReducer = createReducer<SearchState>(
  initialState,
  on(
    SearchActions.loadTypeaheadSuccess,
    (state, { results }): SearchState => ({
      ...state,
      typeahead: results,
      error: '',
    })
  ),
  on(
    SearchActions.loadTypeaheadFailure,
    (state, action): SearchState => {
      return {
        ...state,
        typeahead: [],
        error: action.error,
      };
    }
  )
);

export function SearchReducer(state, action) {
  return _SearchReducer(state, action);
}
