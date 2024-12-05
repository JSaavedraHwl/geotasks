import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor() {
    this.setInitialTheme();
  }

  setInitialTheme() {
    const savedTheme = localStorage.getItem('tema') || 'light'; 
    document.body.setAttribute('theme', savedTheme); 
  }
}