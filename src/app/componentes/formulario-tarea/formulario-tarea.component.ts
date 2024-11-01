import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TaskService, Task } from 'src/app/servicios/task.service';


@Component({
  selector: 'app-formulario-tarea',
  templateUrl: './formulario-tarea.component.html',
  styleUrls: ['./formulario-tarea.component.scss'],
})
export class FormularioTareaComponent implements OnInit {
  modalController = inject(ModalController);
  fb = inject(FormBuilder);
  taskService = inject(TaskService);

  // Recibir el ID de la carpeta a través de la entrada
  folderId!: number;

  // Formulario de creación de tarea
  formulario = this.fb.group({
    nombre: this.fb.control('', Validators.required),
    descripcion: this.fb.control('', Validators.required),
    tieneUbicacion: this.fb.control(false, Validators.required),
    latitud: this.fb.control({ value: '', disabled: true }),
    longitud: this.fb.control({ value: '', disabled: true }),
  });

  hasCoordinates = false;

  constructor() {
    // Monitorear cambios en el campo "tieneUbicacion" para habilitar/deshabilitar coordenadas
    this.formulario.controls.tieneUbicacion.valueChanges.subscribe((value) => {
      if (value) {
        this.formulario.controls.latitud.enable();
        this.formulario.controls.longitud.enable();
        this.formulario.controls.latitud.setValidators(Validators.required);
        this.formulario.controls.longitud.setValidators(Validators.required);
        this.hasCoordinates = true;
      } else {
        this.formulario.controls.latitud.disable();
        this.formulario.controls.longitud.disable();
        this.formulario.controls.latitud.clearValidators();
        this.formulario.controls.longitud.clearValidators();
        this.hasCoordinates = false;
      }
      this.formulario.controls.latitud.updateValueAndValidity();
      this.formulario.controls.longitud.updateValueAndValidity();
    });
  }

  ngOnInit() {}

  // Cerrar el modal
  closeModal() {
    this.modalController.dismiss();
  }

  // Asignar coordenadas desde el evento de selección de ubicación
  setUbicacion(event: { lat: number; lng: number }) {
    this.formulario.controls.latitud.setValue(event.lat.toString());
    this.formulario.controls.longitud.setValue(event.lng.toString());
  }

  // Guardar la tarea en la carpeta especificada
  async saveTask() {
    if (this.formulario.valid) {
      const newTask: Task = {
        id: 0,
        title: this.formulario.controls.nombre.value || '',
        completed: false,
        tieneUbicacion: this.formulario.controls.tieneUbicacion.value || false,
        latitud: this.formulario.controls.latitud.value ? parseFloat(this.formulario.controls.latitud.value) : 0,
        longitud: this.formulario.controls.longitud.value ? parseFloat(this.formulario.controls.longitud.value) : 0,
      };

      // Llamar al servicio para agregar la tarea a la carpeta
      await this.taskService.addTaskToFolder(this.folderId, newTask);
      this.closeModal(); // Cerrar el modal después de guardar
    }
  }
}
