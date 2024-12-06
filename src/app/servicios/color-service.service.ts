import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorServiceService {

  constructor() { }

  toggleDarkMode(tema: string) {
    const body = document.body;
  
    // if (isDarkMode) {
    //   body.classList.add('dark-theme');
    // } else {
    //   body.classList.remove('dark-theme');
    // }
    body.setAttribute('theme', tema);
    localStorage.setItem('tema', tema);
  }
  
}
