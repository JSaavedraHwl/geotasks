import { Component, inject, OnInit } from '@angular/core';
import { NavController, ToggleChangeEventDetail } from '@ionic/angular';
import { IonToggleCustomEvent } from '@ionic/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ColorServiceService } from 'src/app/servicios/color-service.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {


  seleccionarTema: string = 'light'; //el tema predeterminado del movil
  autenticacionService = inject(AutenticacionService);
  colorService = inject(ColorServiceService);

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    const guardadoTema = localStorage.getItem('tema');
    if (guardadoTema) {
      this.seleccionarTema = guardadoTema;
      document.body.setAttribute('theme', guardadoTema);
    }
  }

  cerrarSesion() {
    console.log("cerrando sesión...");
    this.autenticacionService.logout();
  }

  cambiarTema(tema: string) {
    this.colorService.toggleDarkMode(tema);
  }

  // onToggleDarkMode($event: IonToggleCustomEvent<ToggleChangeEventDetail<any>>) {
  //   this.colorService.toggleDarkMode($event.detail.checked);
  // }

  isDarkMode() {
    return document.body.classList.contains('dark-theme');
  }

}