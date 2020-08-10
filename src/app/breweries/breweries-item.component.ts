import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { toggleFavorites } from 'app/state/appstate.actions';

@Component({
  selector: 'breweries-item',
  templateUrl: './breweries-item.component.html',
  styleUrls: ['./breweries-item.component.scss']
})
export class BreweriesItemComponent implements OnInit {
  @Input()  brewery: any
  isfaved :boolean = false
  favArray : Array<any>
  
  constructor(private store: Store<any>) {

  }

  ngOnInit(): void {
    this.store.pipe(select('appState'))
    .subscribe((appState) => {
      this.favArray = Object.values(appState.favourites).map(value=>value["id"])
      console.log("nyerf",this.favArray)
      if (this.brewery) {
        console.log("nyorf",this.brewery.id)
        this.isfaved = this.favArray.includes(this.brewery.id)
      }
    })

}

  handleFavouritization(event) :void {
    event.stopImmediatePropagation()
    this.store.dispatch(toggleFavorites({brewery:this.brewery}))
  }
}
