import { Component, inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  seleccionarTema: string = 'light'; //el tema predeterminado del movil
  autenticacionService = inject(AutenticacionService);

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    const guardadoTema = localStorage.getItem('tema');
    if(guardadoTema){
      this.seleccionarTema = guardadoTema;
      document.body.setAttribute('theme', guardadoTema);
    }
  }

  cerrarSesion(){
    console.log("cerrando sesión...");
    this.autenticacionService.logout();
  }
  
  cambiarTema(tema: string){
    this.seleccionarTema = tema;
    document.body.setAttribute('theme', tema);
    localStorage.setItem('tema', tema);
  }

}