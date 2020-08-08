import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './errors/error-404.component';
import { BreweriesListComponent } from './breweries/breweries-list.component';
import { BreweryDetailComponent } from './breweries/brewery-detail/brewery-detail.component';

import { BreweryRouteActivator } from './breweries/brewery-detail/brewery-route-activator.service';
import { BreweriesListResolver } from './breweries/breweries-list-resolver.service';


export const routes:Routes = [
  {path: 'breweries', component: BreweriesListComponent, resolve: {breweries:BreweriesListResolver}},
  {path: 'breweries/:id', component: BreweryDetailComponent,
  canActivate:[BreweryRouteActivator],
  runGuardsAndResolvers: 'always'},
  {path: '404', component: Error404Component},
  {  path: '', redirectTo: '/breweries', pathMatch: 'full'  }
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
