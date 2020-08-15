import { Component, OnInit, ValueSansProvider } from '@angular/core';
import { BreweryService } from './shared/brewery.service';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { State, getFavourites } from './state/breweries.reducer';

@Component({
  template: `
    <div>
      <h1>Your Fav Brewz Bro</h1>
      <hr />
      <div class="container">
        <div class="item" *ngFor="let brewery of breweries">
          <breweries-item [brewery]="brewery"></breweries-item>
        </div>
        <div *ngIf="noresults" class="noresults">
          <h3>-- looks like you have no favourites saved --</h3>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./breweries-list.component.scss'],
})
export class BreweriesFavouritesComponent implements OnInit {
  breweries: {};
  noresults: boolean = true;
  constructor(private store: Store<State>) {
    this.store.pipe(select(getFavourites)).subscribe((favourites) => {
      this.breweries = Object.values(favourites);
      this.noresults = Object.values(favourites).length == 0;
    });
  }

  ngOnInit(): void {}
}
