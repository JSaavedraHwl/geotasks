import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  cerrarSesion(){
    console.log("cerrando sesión...");

    this.navCtrl.navigateRoot('/autenticacion')
  }
  ngOnInit() {
  }

}