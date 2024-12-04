import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController, ActionSheetController } from '@ionic/angular';
import { TasksPage } from './tasks.page';
import { TaskService } from 'src/app/servicios/task.service';
import { of } from 'rxjs';

describe('TasksPage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let modalControllerSpy: jasmine.SpyObj<ModalController>;
  let actionSheetControllerSpy: jasmine.SpyObj<ActionSheetController>;

  beforeEach(async () => {
    // Espías para los servicios
    taskServiceSpy = jasmine.createSpyObj('TaskService', [
      'folders$',
      'toggleTaskCompletion',
      'deleteTask',
      'addFolder',
    ]);
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create']);
    actionSheetControllerSpy = jasmine.createSpyObj('ActionSheetController', ['create']);

    // Configuración del módulo de prueba
    await TestBed.configureTestingModule({
      declarations: [TasksPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: ActionSheetController, useValue: actionSheetControllerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('debería cargar las carpetas al inicializar', async () => {
      // Simula el flujo de carpetas
      const mockFolders = [{ id: 1, name: 'Carpeta 1', tasks: [] }];
      taskServiceSpy.folders$ = of(mockFolders);

      await component.ngOnInit();

      expect(component.folders).toEqual(mockFolders);
    });
  });

  describe('toggleTaskCompletion', () => {
    it('debería alternar el estado de completado de una tarea', async () => {
      taskServiceSpy.toggleTaskCompletion.and.returnValue(Promise.resolve());
      spyOn(component, 'loadFolders');

      await component.toggleTaskCompletion(1, 1);

      expect(taskServiceSpy.toggleTaskCompletion).toHaveBeenCalledWith(1, 1);
      expect(component.loadFolders).toHaveBeenCalled();
    });
  });

  describe('deleteTask', () => {
    it('debería eliminar una tarea y recargar las carpetas', async () => {
      taskServiceSpy.deleteTask.and.returnValue(Promise.resolve());
      spyOn(component, 'loadFolders');

      await component.deleteTask(1, 1);

      expect(taskServiceSpy.deleteTask).toHaveBeenCalledWith(1, 1);
      expect(component.loadFolders).toHaveBeenCalled();
    });
  });

  describe('addFolder', () => {
    it('debería agregar una nueva carpeta si el nombre no está vacío', async () => {
      component.newFolderName = 'Nueva Carpeta';
      taskServiceSpy.addFolder.and.returnValue(Promise.resolve());
      spyOn(component, 'closeAddFolderModal');

      await component.addFolder();

      expect(taskServiceSpy.addFolder).toHaveBeenCalledWith('Nueva Carpeta');
      expect(component.closeAddFolderModal).toHaveBeenCalled();
    });

    it('no debería agregar una carpeta si el nombre está vacío', async () => {
      component.newFolderName = '';

      await component.addFolder();

      expect(taskServiceSpy.addFolder).not.toHaveBeenCalled();
    });
  });

  describe('presentActionSheet', () => {
    it('debería abrir un action sheet con opciones', async () => {
      const actionSheetMock = {
        present: jasmine.createSpy('present'),
      };
      actionSheetControllerSpy.create.and.returnValue(Promise.resolve(actionSheetMock as any));

      await component.presentActionSheet();

      expect(actionSheetControllerSpy.create).toHaveBeenCalled();
      expect(actionSheetMock.present).toHaveBeenCalled();
    });
  });

  describe('openTaskModal', () => {
    it('debería abrir un modal con el folderId', async () => {
      const modalMock = { present: jasmine.createSpy('present') };
      modalControllerSpy.create.and.returnValue(Promise.resolve(modalMock as any));

      await component.openTaskModal(1);

      expect(modalControllerSpy.create).toHaveBeenCalledWith({
        component: jasmine.any(Function),
        componentProps: { folderId: 1 },
      });
      expect(modalMock.present).toHaveBeenCalled();
    });
  });
});
