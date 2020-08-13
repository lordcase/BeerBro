import { Component, OnInit, ValueSansProvider } from '@angular/core';
import { BreweryService } from './shared/brewery.service';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

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
          <div class="item" *ngFor="let brewery of breweries">
            <breweries-item [brewery]="brewery"></breweries-item>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./breweries-list.component.scss'],
})
export class BreweriesListComponent implements OnInit {
  breweries: any;
  current_page: number = 1;

  constructor(
    private breweryService: BreweryService,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {}
  isFirst = () => this.current_page > 1;

  ngOnInit(): void {
    this.breweries = this.route.snapshot.data['breweries'];
  }

  handlePageUp() {
    this.current_page++;
    this.refreshResults();
  }

  handlePageDown() {
    if (this.current_page > 1) {
      this.current_page--;
      this.refreshResults();
    }
  }

  refreshResults() {
    this.breweryService
      .getBreweries(this.current_page)
      .subscribe((breweries) => {
        console.log(breweries);
        this.breweries = breweries;
      });
  }
}
