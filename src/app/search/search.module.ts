import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SearchEffects } from './state/search.effects';
import { SearchReducer } from './state/search.reducer';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BreweryService } from '../breweries/shared/brewery.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    StoreModule.forFeature('search', SearchReducer),
    // RouterModule.forChild(searchRoutes),
    EffectsModule.forFeature([SearchEffects]),
  ],
  declarations: [SearchComponent],
  providers: [BreweryService],
  exports: [SearchComponent],
})
export class SearchModule {}
