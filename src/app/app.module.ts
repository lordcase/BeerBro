import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Error404Component } from './errors/error-404.component';
import { BreweriesListComponent } from './breweries/breweries-list.component';
import { BreweriesItemComponent } from './breweries/breweries-item.component';
import { BreweryDetailComponent } from './breweries/brewery-detail/brewery-detail.component';
import { BreweryRouteActivator } from './breweries/brewery-detail/brewery-route-activator.service';
import { BreweriesListResolver } from './breweries/breweries-list-resolver.service';
import { HeaderComponent } from './nav/header.component';
import { FooterComponent } from './nav/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    BreweriesListComponent,
    BreweriesItemComponent,
    BreweryDetailComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    BreweryRouteActivator,
    BreweriesListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
