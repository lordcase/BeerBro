import { createAction, props } from '@ngrx/store';

export const toggleFavorites = createAction('[Favourites] Add to favourites',props<{brewery:any}>())