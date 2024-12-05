import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormularioTareaComponent } from './formulario-tarea.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TaskService } from 'src/app/servicios/task.service';
import { of } from 'rxjs';

describe('FormularioTareaComponent', () => {
  let component: FormularioTareaComponent;
  let fixture: ComponentFixture<FormularioTareaComponent>;

  // Mock de ModalController
  const modalControllerMock = {
    dismiss: jasmine.createSpy('dismiss'),
  };

  // Mock de TaskService
  const taskServiceMock = {
    addTaskToFolder: jasmine.createSpy('addTaskToFolder').and.returnValue(Promise.resolve()),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioTareaComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        FormBuilder, // Proveedor de FormBuilder
        { provide: ModalController, useValue: modalControllerMock }, // Mock de ModalController
        { provide: TaskService, useValue: taskServiceMock }, // Mock de TaskService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.formulario).toBeDefined();
    expect(component.formulario.controls['nombre']).toBeDefined();
    expect(component.formulario.controls['descripcion']).toBeDefined();
    expect(component.formulario.controls['tieneUbicacion']).toBeDefined();
  });

  it('should toggle coordinate fields based on tieneUbicacion', () => {
    const latitud = component.formulario.controls['latitud'];
    const longitud = component.formulario.controls['longitud'];

    // Simula habilitar la ubicación
    component.formulario.controls['tieneUbicacion'].setValue(true);
    expect(latitud.enabled).toBeTrue();
    expect(longitud.enabled).toBeTrue();
    expect(latitud.validator).toBeDefined();
    expect(longitud.validator).toBeDefined();

    // Simula deshabilitar la ubicación
    component.formulario.controls['tieneUbicacion'].setValue(false);
    expect(latitud.disabled).toBeTrue();
    expect(longitud.disabled).toBeTrue();
    expect(latitud.validator).toBeNull();
    expect(longitud.validator).toBeNull();
  });

  it('should call TaskService to save the task and close the modal', async () => {
    const taskData = {
      id: 0,
      title: 'Test Task',
      completed: false,
      tieneUbicacion: false,
      latitud: 0,
      longitud: 0,
    };

    // Llena el formulario con datos válidos
    component.formulario.controls['nombre'].setValue(taskData.title);
    component.formulario.controls['descripcion'].setValue('Test Description');

    // Simula la carpeta ID
    component.folderId = 1;

    // Llama a guardarTarea
    await component.guardarTarea();

    // Verifica que el servicio haya sido llamado con los datos correctos
    expect(taskServiceMock.addTaskToFolder).toHaveBeenCalledWith(1, jasmine.objectContaining(taskData));

    // Verifica que el modal se haya cerrado
    expect(modalControllerMock.dismiss).toHaveBeenCalled();
  });
});
