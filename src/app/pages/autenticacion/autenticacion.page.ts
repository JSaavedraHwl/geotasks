import { Component, inject, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { LocalicacionService } from 'src/app/servicios/localicacion.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.page.html',
  styleUrls: ['./autenticacion.page.scss'],
})
export class AutenticacionPage implements OnInit {

  autenticacionService = inject(AutenticacionService);
  localicacionService = inject(LocalicacionService);
  notificacionesService = inject(NotificacionesService);
  constructor() { }

  ngOnInit() {
    this.localicacionService.printCurrentPosition();
    
  }

  logear() {
    this.autenticacionService.authenticate(true);
  }

}
