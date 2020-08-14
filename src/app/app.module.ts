import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Error404Component } from './errors/error-404.component';
import { BreweriesListComponent } from './breweries/breweries-list.component';
import { BreweriesSearchComponent } from './breweries/breweries-search.component';
import { BreweriesFavouritesComponent } from './breweries/breweries-favourites.component';
import { BreweriesItemComponent } from './breweries/breweries-item.component';
import { BreweryDetailComponent } from './breweries/brewery-detail/brewery-detail.component';
import { BreweryRouteActivator } from './breweries/brewery-detail/brewery-route-activator.service';
import { BreweriesListResolver } from './breweries/breweries-list-resolver.service';
import { HeaderComponent } from './nav/header.component';
import { FooterComponent } from './nav/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appState } from './state/appstate.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    BreweriesListComponent,
    BreweriesSearchComponent,
    BreweriesFavouritesComponent,
    BreweriesItemComponent,
    BreweryDetailComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ appState: appState }, {}),
    StoreDevtoolsModule.instrument({
      name: 'BrewBro Devtools',
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [BreweryRouteActivator, BreweriesListResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
