import { Component } from '@angular/core';

@Component({
    selector: 'app-loader',
    template: '<div class="loader">Loading...</div>',
    styles: [`
    .loader,
    .loader:after {
      border-radius: 50%;
      width: 10em;
      height: 10em;
    }

    .loader {
      margin: 60px auto;
      font-size: 10px;
      position: relative;
      text-indent: -9999em;
      border: 1.1em solid rgba(255, 255, 255, 0.2);
      border-left-color: #22b8cf;
      transform: translateZ(0);
      animation: load8 1.1s infinite linear;
    }

    @keyframes load8 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `]
})
export class LoaderComponent {
}
