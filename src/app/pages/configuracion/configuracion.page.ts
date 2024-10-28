import { Component, inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  autenticacionService = inject(AutenticacionService);

  constructor(private navCtrl: NavController) { }

  cerrarSesion(){
    console.log("cerrando sesión...");
    this.autenticacionService.logout();
  }
  ngOnInit() {
  }

}