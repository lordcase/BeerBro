import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { BreweriesEffects } from './state/breweries.effects';
import { BreweriesReducer } from './state/breweries.reducer';
import { BreweriesListComponent } from './breweries-list.component';
import { BreweriesSearchComponent } from './breweries-search.component';
import { BreweriesFavouritesComponent } from './breweries-favourites.component';
import { BreweriesItemComponent } from './breweries-item.component';
import { BreweryDetailComponent } from './brewery-detail/brewery-detail.component';
import { BreweryRouteActivator } from './brewery-detail/brewery-route-activator.service';
import { BreweriesListResolver } from './breweries-list-resolver.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BreweryService } from './shared/brewery.service';

const breweriesRoutes: Routes = [
  {
    path: 'breweries',
    component: BreweriesListComponent,
    resolve: { breweries: BreweriesListResolver },
  },
  {
    path: 'breweries/:id',
    component: BreweryDetailComponent,
    canActivate: [BreweryRouteActivator],
    // runGuardsAndResolvers: 'always',
  },
  { path: 'favourites', component: BreweriesFavouritesComponent },
  { path: 'search/:search', component: BreweriesSearchComponent },
  { path: '', redirectTo: '/breweries', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('breweries', BreweriesReducer),
    RouterModule.forChild(breweriesRoutes),
    EffectsModule.forFeature([BreweriesEffects]),
  ],
  declarations: [
    BreweriesListComponent,
    BreweriesSearchComponent,
    BreweriesFavouritesComponent,
    BreweriesItemComponent,
    BreweryDetailComponent,
  ],
  providers: [BreweryRouteActivator, BreweriesListResolver, BreweryService],
})
export class BreweriesModule {}
