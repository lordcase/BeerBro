import { Component, OnInit, ValueSansProvider } from '@angular/core';
import { BreweryService } from './shared/brewery.service';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private store: Store<any>) {
    this.store.pipe(select('appState')).subscribe((appState) => {
      this.breweries = Object.values(appState.favourites);
      this.noresults = Object.values(appState.favourites).length == 0;
    });
  }

  ngOnInit(): void {}
}
