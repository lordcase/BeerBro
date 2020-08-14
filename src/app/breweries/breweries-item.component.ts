import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { toggleFavorites } from 'app/state/appstate.actions';
import { AppState, getFavourites } from 'app/state/appstate.reducer';

@Component({
  selector: 'breweries-item',
  templateUrl: './breweries-item.component.html',
  styleUrls: ['./breweries-item.component.scss'],
})
export class BreweriesItemComponent implements OnInit {
  @Input() brewery: any;
  isfaved: boolean = false;
  favArray: Array<any>;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select(getFavourites).subscribe((appState) => {
      console.log('as', appState);
      // this.favArray = Object.values(appState).map((value) => value['id']);
      if (this.brewery) {
        this.isfaved = this.favArray.includes(this.brewery.id);
      }
    });
  }

  handleFavouritization(event): void {
    event.stopImmediatePropagation();
    this.store.dispatch(toggleFavorites({ brewery: this.brewery }));
  }
}
