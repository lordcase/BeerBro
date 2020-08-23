import {
  createReducer,
  createSelector,
  on,
  createAction,
  props,
} from '@ngrx/store';
// Representation of the entire app state
// Extended by lazy loaded modules

export interface LoadingState {
  loading: boolean;
}

export interface State {
  loadingState: LoadingState;
}

export const initialState: LoadingState = {
  loading: false,
};

export const selectLoading = (state: State) => state.loadingState;

export const getLoadingFlag = createSelector(
  selectLoading,
  (state) => state.loading
);

export const setLoadingFlagAction = createAction(
  '[Loading] Set loading flag',
  props<{ flag: boolean }>()
);

const _LoadingReducer = createReducer<LoadingState>(
  initialState,
  on(
    setLoadingFlagAction,
    (state, { flag }): LoadingState => ({
      loading: flag,
    })
  )
);

export function LoadingReducer(state, action) {
  return _LoadingReducer(state, action);
}
