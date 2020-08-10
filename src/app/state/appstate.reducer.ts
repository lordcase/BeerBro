import { createReducer, on } from '@ngrx/store' 
import * as AppActions from './appstate.actions';

export interface State {
  favourites: Object;
}
export const initialState: State = {
  favourites: {}
};

 export const appState = createReducer(
   initialState,
   on(AppActions.toggleFavorites, (state, {brewery}) => {
     const newFavourites = {...state.favourites}
     if (Object.keys(state.favourites).includes(""+brewery.id)) {
       delete newFavourites[brewery.id]
      } else {
        newFavourites[brewery.id] = brewery
      }
     return {
       ...state,
       favourites : newFavourites,
       modified: true
     }
   })
 );