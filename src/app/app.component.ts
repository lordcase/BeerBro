import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header-bar></header-bar>
    <section class="main">
      <router-outlet></router-outlet>
    </section>
    <footer-bar></footer-bar>
  `,
  styles: [`
    section.main {padding: 20px 20px 40px;}
  `]
})
export class AppComponent {
  title = 'BeerBro';
}
