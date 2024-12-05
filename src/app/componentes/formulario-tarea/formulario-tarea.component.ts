import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TaskService, Task } from 'src/app/servicios/task.service';

@Component({
  selector: 'app-formulario-tarea',
  templateUrl: './formulario-tarea.component.html',
  styleUrls: ['./formulario-tarea.component.scss'],
})
export class FormularioTareaComponent  {
  modalController = inject(ModalController);
  fb = inject(FormBuilder);
  taskService = inject(TaskService);

  folderId!: number; // ID de la carpeta donde se guardará la tarea
  formulario!: FormGroup; // Formulario para gestionar los datos de la tarea
  hasCoordinates = false; // Indica si las coordenadas están habilitadas

  constructor() {
    this.inicializarFormulario();
    this.configurarListenerUbicacion();
  }


  /**
   * Inicializa el formulario con sus campos y validadores.
   */
  private inicializarFormulario() {
    this.formulario = this.fb.group({
      nombre: this.fb.control('', Validators.required),
      descripcion: this.fb.control('', Validators.required),
      tieneUbicacion: this.fb.control(false, Validators.required),
      latitud: this.fb.control({ value: '', disabled: true }),
      longitud: this.fb.control({ value: '', disabled: true }),
    });
  }

  /**
   * Configura un listener para cambios en el campo "tieneUbicacion".
   * Este listener habilita o deshabilita los campos de coordenadas.
   */
  private configurarListenerUbicacion() {
    this.formulario.controls['tieneUbicacion'].valueChanges.subscribe((value) => {
      this.cambiarEstadoCoordenadas(value);
    });
  }

  /**
   * Habilita o deshabilita los campos de coordenadas y actualiza las validaciones.
   * @param habilitar True para habilitar los campos, false para deshabilitarlos.
   */
  private cambiarEstadoCoordenadas(habilitar: boolean) {
    if (habilitar) {
      this.formulario.controls['latitud'].enable();
      this.formulario.controls['longitud'].enable();
      this.formulario.controls['latitud'].setValidators(Validators.required);
      this.formulario.controls['longitud'].setValidators(Validators.required);
      this.hasCoordinates = true;
    } else {
      this.formulario.controls['latitud'].disable();
      this.formulario.controls['longitud'].disable();
      this.formulario.controls['latitud'].clearValidators();
      this.formulario.controls['longitud'].clearValidators();
      this.hasCoordinates = false;
    }
    this.formulario.controls['latitud'].updateValueAndValidity();
    this.formulario.controls['longitud'].updateValueAndValidity();
  }

  /**
   * Cierra el modal actual.
   */
  cerrarModal() {
    this.modalController.dismiss();
  }

  /**
   * Asigna las coordenadas al formulario desde un evento de selección de ubicación.
   * @param evento Evento con las coordenadas (latitud y longitud).
   */
  asignarUbicacion(evento: { lat: number; lng: number }) {
    this.formulario.controls['latitud'].setValue(evento.lat.toString());
    this.formulario.controls['longitud'].setValue(evento.lng.toString());
  }

  /**
   * Crea un objeto de tarea basado en los datos del formulario.
   * @returns Una nueva tarea con los datos capturados en el formulario.
   */
  private crearTareaDesdeFormulario(): Task {
    return {
      id: 0,
      title: this.formulario.controls['nombre'].value || '',
      completed: false,
      tieneUbicacion: this.formulario.controls['tieneUbicacion'].value || false,
      latitud: this.formulario.controls['latitud'].value
        ? parseFloat(this.formulario.controls['latitud'].value)
        : 0,
      longitud: this.formulario.controls['longitud'].value
        ? parseFloat(this.formulario.controls['longitud'].value)
        : 0,
    };
  }

  /**
   * Guarda la tarea en la carpeta especificada.
   * Si el formulario es válido, llama al servicio para agregar la tarea.
   */
  async guardarTarea() {
    if (this.formulario.valid) {
      const nuevaTarea = this.crearTareaDesdeFormulario();
      await this.taskService.addTaskToFolder(this.folderId, nuevaTarea);
      this.cerrarModal();
    }
  }
}
