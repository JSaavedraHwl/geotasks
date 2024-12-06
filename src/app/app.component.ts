import { Component, inject } from '@angular/core';
import { ColorServiceService } from './servicios/color-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  colorService = inject(ColorServiceService);
  constructor() {
    const tema = localStorage.getItem('tema');
    if (tema) {
      document.body.setAttribute('theme', tema);
    }
    else {
      document.body.setAttribute('theme', 'light');
    }
  }
}