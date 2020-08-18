import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './nav/header.component';
import { FooterComponent } from './nav/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { Error404Component } from './errors/error-404.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchModule } from './search/search.module';
import { BreweriesModule } from './breweries/breweries.module';
import { EffectsModule } from '@ngrx/effects';

// import { appState } from './state/appstate.reducer';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    SearchModule,
    BreweriesModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      name: 'BrewBro Devtools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
