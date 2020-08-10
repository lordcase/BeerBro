import { Component } from '@angular/core'

@Component({
  template: `
    <div class="container">
      <h1 class="errorMessage">Nothing Brewing Here Bro</h1>
      <h2 class="errorMessage">Just a big ol'</h2>
      <div class="error_illustration">
        <img src="assets/logo_brewnicorn.png">
      </div>
      <h2 class="errorMessage big">404</h2>
    </div>
  `,
  styles: [`
    .container {
      margin-top:5vh;
      text-align: center;
    }
    .errorMessage.big {
      margin: 15px 0 30px;
      font-size: 60px;
    } 
    .errorMessage { 
      font-size: 1.5;
      text-align: center; 
      color: var(--tertiary-color);
    }
    .error_illustration {
      text-align:center;
      display:inline-block;
      background-color: var(--tertiary-color);
      border-radius: 50%;
      margin: 0 auto;
    }
  `]
})
export class Error404Component{
  constructor() {

  }

}