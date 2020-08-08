import { Component, OnInit } from '@angular/core';
import { BreweryService } from './shared/brewery.service';
import {ActivatedRoute} from '@angular/router'


@Component({
  template: `
    <div>
      <h1>Breweries around the world</h1>
      <hr>
      <div class="container">
        <div class="item" *ngFor="let brewery of breweries">
          <breweries-item [brewery]="brewery"></breweries-item>
        </div>    
      </div>    
    </div>    
  `,
  styleUrls: ['./breweries-list.component.scss'],
})


export class BreweriesListComponent implements OnInit {
  breweries:any
  constructor(private breweryService:BreweryService, private route:ActivatedRoute) {

  }
  
  ngOnInit() {
    this.breweries = this.route.snapshot.data['breweries']
  }


}
