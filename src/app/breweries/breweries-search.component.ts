import { Component, OnInit } from '@angular/core';
import { BreweryService } from './shared/brewery.service';
import { Store, select } from '@ngrx/store'
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router'


@Component({
  template: `
    <div>
      <h1>Search results for: "{{search}}"</h1>
      <hr>
      <div class="results">
        <div class="container">
          <div class="item" *ngFor="let brewery of breweries">
            <breweries-item [brewery]="brewery"></breweries-item>
          </div>
          <div *ngIf="noresults" class="noresults"><h3>-- oops, no results found --</h3></div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./breweries-list.component.scss'],
})





export class BreweriesSearchComponent implements OnInit {
  breweries:any
  search : string = ''
  navigationSubscription
  noresults = false

  constructor(private breweryService:BreweryService, private route:ActivatedRoute, private router:Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }
  ngOnInit() {
    this.search = this.route.snapshot.paramMap.get('search')
    this.query()
  }
  initialiseInvites() {
    this.search = this.route.snapshot.paramMap.get('search')
    this.query()
  }
  
  query() {
    this.search = this.route.snapshot.paramMap.get('search')
    this.breweryService.freeSearch(this.search)
    .subscribe((result)=>{
      this.breweries = result
      this.noresults = Object.values(result).length === 0
    })
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}