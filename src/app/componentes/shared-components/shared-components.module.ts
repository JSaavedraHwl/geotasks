import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from '../mapa/mapa.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormularioTareaComponent } from '../formulario-tarea/formulario-tarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [MapaComponent, FormularioTareaComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    MapaComponent, FormularioTareaComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedComponentsModule { }
