import { Component, OnInit } from '@angular/core';
import { BreweryService } from './shared/brewery.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  loadBreweriesPage,
  saveCurrentPage,
  hello,
} from 'app/breweries/state/breweries.actions';
import {
  getCurrentPage,
  Brewery,
  getBreweriesPage,
} from './state/breweries.reducer';
import { Observable } from 'rxjs';

@Component({
  template: `
    <div>
      <h1>Breweries around the world</h1>
      <hr />
      <div class="results">
        <div class="pagination">
          <div
            *ngIf="isFirst()"
            class="page_control back"
            (click)="handlePageDown()"
          >
            &lt;
          </div>
          <div class="page_current">{{ current_page }}</div>
          <div class="page_control forward" (click)="handlePageUp()">&gt;</div>
        </div>
        <div class="container">
          <div class="item" *ngFor="let brewery of breweries$ | async">
            <breweries-item [brewery]="brewery"></breweries-item>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./breweries-list.component.scss'],
})
export class BreweriesListComponent implements OnInit {
  // breweries: any;
  current_page: number = 1;
  breweries$: Observable<Brewery[]> = this.store.select(getBreweriesPage);
  constructor(
    private breweryService: BreweryService,
    private route: ActivatedRoute,
    private store: Store
  ) {}
  isFirst = () => this.current_page > 1;

  ngOnInit(): void {
    this.store.select(getCurrentPage).subscribe((page) => {
      this.current_page = page;
      this.store.dispatch(loadBreweriesPage({ page }));
    });
  }

  handlePageUp() {
    this.store.dispatch(saveCurrentPage({ page: this.current_page + 1 }));
  }

  handlePageDown() {
    if (this.current_page > 1) {
      this.store.dispatch(saveCurrentPage({ page: this.current_page - 1 }));
    }
  }
}
