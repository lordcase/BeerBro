import { createAction, props } from '@ngrx/store';
import { SearchReducer, TypeaheadResult } from './search.reducer';

export const loadTypeahead = createAction(
  '[Search] Load typeahead results',
  props<{ term: string }>()
);

export const loadTypeaheadSuccess = createAction(
  '[Search] Load typeahead results success',
  props<{ results: TypeaheadResult[] }>()
);

export const loadTypeaheadFailure = createAction(
  '[Search] Load typeahead results failure',
  props<{ error: string }>()
);

export const clearTypeahead = createAction('[Search] Clear typeahead results');
