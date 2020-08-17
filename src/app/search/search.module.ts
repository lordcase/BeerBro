import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SearchEffects } from './state/search.effects';
import { SearchReducer } from './state/search.reducer';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchService } from '../search/shared/brewery.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('search', SearchReducer),
    // RouterModule.forChild(searchRoutes),
    EffectsModule.forFeature([SearchEffects]),
  ],
  declarations: [SearchComponent],
  providers: [SearchService],
})
export class SearchModule {}
