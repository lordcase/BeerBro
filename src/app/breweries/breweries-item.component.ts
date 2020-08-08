import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'breweries-item',
  templateUrl: './breweries-item.component.html',
  styleUrls: ['./breweries-item.component.scss']
})
export class BreweriesItemComponent implements OnInit {
  @Input()  brewery: any
  constructor() { }

  ngOnInit(): void {
  }

}
