import { Routes } from '@angular/Router'
import { Error404Component } from './errors/error-404.component';
import { BreweriesListComponent } from './breweries/breweries-list.component';
import { BreweryDetailComponent } from './breweries/brewery-detail/brewery-detail.component';

import { BreweryRouteActivator } from './breweries/brewery-detail/brewery-route-activator.service';
import { BreweriesListResolver } from './breweries/breweries-list-resolver.service';


export const appRoutes:Routes = [
  {path: 'breweries', component: BreweriesListComponent, resolve: {events:BreweriesListResolver}},
  {path: 'breweries/:id', component: BreweryDetailComponent,
  canActivate:[BreweryRouteActivator]},
  {path: '404', component: Error404Component},
  {  path: '', redirectTo: '/breweries', pathMatch: 'full'  }
  
]