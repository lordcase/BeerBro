import { Component, OnInit, OnDestroy } from '@angular/core'
import { BreweryService } from '../shared/brewery.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'

@Component({
  templateUrl: './brewery-detail.component.html',
  styleUrls: ['./brewery-detail.component.scss']
})

export class BreweryDetailComponent implements OnInit, OnDestroy {
  brewery: any
  navigationSubscription
  constructor(private breweryService:BreweryService, private route:ActivatedRoute, private router:Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }
  ngOnInit() {
    
  }
  initialiseInvites() {
    this.breweryService.getBrewery(+this.route.snapshot.paramMap.get('id'))
    .subscribe((result)=>{
      this.brewery = result
    })
    console.log('brr',this.brewery)
  }
 
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}