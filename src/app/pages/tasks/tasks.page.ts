import { Component, inject, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { FormularioTareaComponent } from 'src/app/componentes/formulario-tarea/formulario-tarea.component';
import { Folder, TaskService } from 'src/app/servicios/task.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  actionSheetController = inject(ActionSheetController);
  modalController = inject(ModalController);
  
  folders :Folder []= [];
  isAddFolderModalOpen = false;
  newFolderName: string = '';
  constructor(private taskService: TaskService) {}
  
  async ngOnInit() {
    await this.loadFolders();
  }
  
  // Cargar las carpetas y sus tareas
  async loadFolders() {
    this.taskService.folders$.subscribe(
      (value)=> {
        this.folders = value;
      }
    );
  }
  
  // Alternar el estado de completado de una tarea
  async toggleTaskCompletion(folderId: number, taskId: number) {
    await this.taskService.toggleTaskCompletion(folderId, taskId);
    await this.loadFolders();
  }
  
  // Eliminar una tarea
  async deleteTask(folderId: number, taskId: number) {
    await this.taskService.deleteTask(folderId, taskId);
    await this.loadFolders();
  }
  openAddFolderModal() {
    this.isAddFolderModalOpen = true;
  }
  
  closeAddFolderModal(event?: any) {
    this.isAddFolderModalOpen = false;
    this.newFolderName = ''; // Limpiar el nombre después de cerrar
  }
  async addFolder() {
    if (this.newFolderName.trim()) {
      await this.taskService.addFolder(this.newFolderName);
      this.closeAddFolderModal();
    } else {
      console.log('El nombre de la carpeta no puede estar vacío');
    }
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Agregar',
      buttons: [
        {
          text: 'Nueva Carpeta',
          icon: 'folder-outline',
          handler: () => {
            this.openAddFolderModal();
          },
        },
        {
          text: 'Nueva Tarea',
          icon: 'document-text-outline',
          handler: () => {
            this.agregarTarea();
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
  
    await actionSheet.present();
  }
  agregarTarea() {
    console.log('abriendo agregar tarea');
    this.modalController.create({
      component: FormularioTareaComponent,
    }).then((modal) => {
      modal.present();
    });
  }
}
