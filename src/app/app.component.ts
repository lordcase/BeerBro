import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header-bar></header-bar>
    <router-outlet></router-outlet>
    <footer-bar></footer-bar>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BeerBro';
}
