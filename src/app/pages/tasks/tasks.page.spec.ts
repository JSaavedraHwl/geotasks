import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksPage } from './tasks.page';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, ActionSheetController, ModalController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TaskService } from 'src/app/servicios/task.service';
import { of } from 'rxjs';
import { FormularioTareaComponent } from 'src/app/componentes/formulario-tarea/formulario-tarea.component';

describe('TasksPage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;

  // Mock de TaskService
  const taskServiceMock = {
    folders$: of([]), // Simula folders como un observable vacío
    toggleTaskCompletion: jasmine.createSpy('toggleTaskCompletion').and.returnValue(Promise.resolve()),
    deleteTask: jasmine.createSpy('deleteTask').and.returnValue(Promise.resolve()),
    addFolder: jasmine.createSpy('addFolder').and.returnValue(Promise.resolve()),
  };

  // Mock de ModalController
  const modalControllerMock = {
    create: jasmine.createSpy('create').and.returnValue(
      Promise.resolve({
        present: jasmine.createSpy('present').and.returnValue(Promise.resolve()),
      })
    ),
  };

  // Mock de ActionSheetController
  const actionSheetControllerMock = {
    create: jasmine.createSpy('create').and.returnValue(
      Promise.resolve({
        present: jasmine.createSpy('present').and.returnValue(Promise.resolve()),
      })
    ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HttpClientModule],
      declarations: [TasksPage],
      providers: [
        { provide: TaskService, useValue: taskServiceMock },
        { provide: ModalController, useValue: modalControllerMock },
        { provide: ActionSheetController, useValue: actionSheetControllerMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Para ignorar errores de componentes personalizados como ion-*
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load folders on initialization', () => {
    spyOn(component, 'loadFolders').and.callThrough();
    component.ngOnInit();
    expect(component.loadFolders).toHaveBeenCalled();
  });

  it('should toggle task completion', async () => {
    await component.toggleTaskCompletion(1, 101);
    expect(taskServiceMock.toggleTaskCompletion).toHaveBeenCalledWith(1, 101);
    expect(taskServiceMock.toggleTaskCompletion).toHaveBeenCalledTimes(1);
  });

  it('should delete a task', async () => {
    await component.deleteTask(1, 101);
    expect(taskServiceMock.deleteTask).toHaveBeenCalledWith(1, 101);
    expect(taskServiceMock.deleteTask).toHaveBeenCalledTimes(1);
  });

  it('should open add folder modal', () => {
    component.openAddFolderModal();
    expect(component.isAddFolderModalOpen).toBeTrue();
  });

  it('should close add folder modal and clear folder name', () => {
    component.newFolderName = 'Test Folder';
    component.closeAddFolderModal();
    expect(component.isAddFolderModalOpen).toBeFalse();
    expect(component.newFolderName).toBe('');
  });

  it('should add a folder if name is valid', async () => {
    component.newFolderName = 'Valid Folder';
    await component.addFolder();
    expect(taskServiceMock.addFolder).toHaveBeenCalledWith('Valid Folder');
    expect(taskServiceMock.addFolder).toHaveBeenCalledTimes(1);
  });

  it('should not add a folder if name is empty', async () => {
    component.newFolderName = '  ';
    spyOn(console, 'log');
    await component.addFolder();
    expect(taskServiceMock.addFolder).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('El nombre de la carpeta no puede estar vacío');
  });

  it('should present action sheet for adding tasks or folders', async () => {
    await component.presentActionSheet();
    expect(actionSheetControllerMock.create).toHaveBeenCalled();
    const actionSheet = await actionSheetControllerMock.create.calls.mostRecent().returnValue;
    expect(actionSheet.present).toHaveBeenCalled();
  });

  it('should open task modal with folderId', async () => {
    await component.openTaskModal(1);
    expect(modalControllerMock.create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        component: FormularioTareaComponent,
        componentProps: { folderId: 1 },
      })
    );
    const modal = await modalControllerMock.create.calls.mostRecent().returnValue;
    expect(modal.present).toHaveBeenCalled();
  });

  it('should call agregarTarea on action sheet handler', () => {
    spyOn(component, 'agregarTarea');
    component.presentActionSheet();
    const handler = actionSheetControllerMock.create.calls.mostRecent().args[0].buttons.find(
      (b: any) => b.text === 'Nueva Tarea'
    ).handler;
    handler();
    expect(component.agregarTarea).toHaveBeenCalled();
  });
});
