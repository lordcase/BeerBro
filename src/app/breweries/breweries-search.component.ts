import { Component, OnInit } from '@angular/core';
import { BreweryService } from './shared/brewery.service';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import * as BreweriesActions from './state/breweries.actions';
import {
  getResultCount,
  Brewery,
  getFreeSearchPage,
} from './state/breweries.reducer';
import { setLoadingFlagAction } from '../state/app.state';

@Component({
  template: `
    <div>
      <h1>Search results for: "{{ search }}" ({{ resultCount$ | async }})</h1>
      <hr />
      <div class="results">
        <div class="container">
          <div class="item" *ngFor="let brewery of breweries$ | async">
            <breweries-item [brewery]="brewery"></breweries-item>
          </div>
          <div *ngIf="!(resultCount$ | async)" class="noresults">
            <h3>-- oops, no results found --</h3>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./breweries-list.component.scss'],
})
export class BreweriesSearchComponent implements OnInit {
  breweries$: Observable<Brewery[]>;
  search: string;
  navigationSubscription;
  noresults = false;
  resultCount$: Observable<number>;
  resultCount: number;

  constructor(
    private breweryService: BreweryService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.store.dispatch(setLoadingFlagAction({ flag: true }));
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit() {
    this.search = this.route.snapshot.paramMap.get('search');
    this.resultCount = 0;
    this.noresults = !this.resultCount;
    this.resultCount$ = this.store.select(getResultCount);
    this.breweries$ = this.store.select(getFreeSearchPage);
    this.store.dispatch(
      BreweriesActions.loadFreeSearchPage({ searchTerm: this.search })
    );
  }
  initialiseInvites() {
    this.search = this.route.snapshot.paramMap.get('search');
    this.store.dispatch(
      BreweriesActions.loadFreeSearchPage({ searchTerm: this.search })
    );
  }

  // query() {
  //   this.search = this.route.snapshot.paramMap.get('search');
  //   this.breweryService.freeSearch(this.search).subscribe((result) => {
  //     this.breweries = result;
  //     this.noresults = Object.values(result).length === 0;
  //     this.result_count = Object.values(result).length;
  //   });
  // }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
