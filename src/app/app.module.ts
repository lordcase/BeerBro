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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchModule } from './search/search.module';
import { BreweriesModule } from './breweries/breweries.module';
import { EffectsModule } from '@ngrx/effects';
import { LoadingReducer } from './state/app.state';

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
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ loadingState: LoadingReducer }),
    StoreDevtoolsModule.instrument({
      name: 'BrewBro Devtools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [MatSnackBar, OverlayModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
