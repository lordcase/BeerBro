import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './errors/error-404.component';
import { BreweriesListComponent } from './breweries/breweries-list.component';
import { BreweriesFavouritesComponent } from './breweries/breweries-favourites.component';
import { BreweriesSearchComponent } from './breweries/breweries-search.component';
import { BreweryDetailComponent } from './breweries/brewery-detail/brewery-detail.component';

import { BreweryRouteActivator } from './breweries/brewery-detail/brewery-route-activator.service';
import { BreweriesListResolver } from './breweries/breweries-list-resolver.service';

export const routes: Routes = [
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
