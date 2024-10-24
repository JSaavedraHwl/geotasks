import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-formulario-tarea',
  templateUrl: './formulario-tarea.component.html',
  styleUrls: ['./formulario-tarea.component.scss'],
})
export class FormularioTareaComponent  implements OnInit {
  modalController = inject(ModalController);
  fb = inject(FormBuilder);
  formulario = this.fb.group({
    nombre: this.fb.control({value: '', disabled: false}, Validators.required),
    descripcion: this.fb.control({value: '', disabled: false}, Validators.required),
    // fecha: [''],
    // hora: [''],
    tieneUbicacion: this.fb.control({value: false, disabled: false}, Validators.required),
    latitud: this.fb.control({value: '', disabled: true}),
    longitud: this.fb.control({value: '', disabled: true}),
  });

  hasCoordinates = false;


  constructor() {
    this.formulario.controls.tieneUbicacion.valueChanges.subscribe((value) => {
      if (value) {
        this.formulario.controls.latitud.enable();
        this.formulario.controls.longitud.enable();
        this.formulario.controls.longitud.validator = Validators.required;
        this.formulario.controls.latitud.validator = Validators.required;
        this.hasCoordinates = true;
      } else {
        this.formulario.controls.latitud.disable();
        this.formulario.controls.longitud.disable();
        this.hasCoordinates = false;
      }
      this.formulario.updateValueAndValidity();
    });
  }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }
  setUbicacion(event: {lat: number, lng: number}) {
    this.formulario.controls.latitud.setValue(event.lat.toString());
    this.formulario.controls.longitud.setValue(event.lng.toString());
  }

}
