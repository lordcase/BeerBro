import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from './state/app.state';

@Component({
  selector: 'app-root',
  template: `
    <header-bar></header-bar>
    <section class="main">
      <div class="spinner_div" *ngIf="loading$ | async">
        <mat-spinner
          class="custom_spinner"
          aria-label="loading..."
        ></mat-spinner>
      </div>
      <router-outlet></router-outlet>
    </section>
    <footer-bar></footer-bar>
  `,
  styles: [
    `
      section.main {
        padding: 20px 20px 40px;
      }
      div.spinner_div {
        position: fixed;
        right: calc(50% - 100px);
        top: calc(50% - 80px);
        background-color: var(--secondary-color);
        border-radius: 50%;
        padding: 30px;
        z-index: 10;
      }
      :host ::ng-deep .custom_spinner circle {
        stroke: var(--primary-color);
      }
    `,
  ],
})
export class AppComponent {
  title = 'BeerBro';
  loading$: Observable<boolean> = this.store.pipe(
    select(fromRoot.getLoadingFlag)
  );
  constructor(private store: Store) {
    console.log('loading', this.loading$);
  }
}
