import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  tieneUbicacion: boolean;
  latitud: number;
  longitud: number;
}

export interface Folder {
  id: number;
  name: string;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private foldersSubject: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([]);
  public folders$: Observable<Folder[]> = this.foldersSubject.asObservable();

  constructor() {
    this.loadFolders();
  }

  // Cargar carpetas desde el almacenamiento de manera asíncrona
  async loadFolders(): Promise<void> {
    const { value } = await Preferences.get({ key: 'folders' });
    const folders = value ? JSON.parse(value) : this.getDefaultFolders();
    this.foldersSubject.next(folders);
  }

  // Obtener las carpetas por defecto si no hay datos en el almacenamiento
  private getDefaultFolders(): Folder[] {
    return [
      {
        id: 1,
        name: 'Carpeta 1',
        tasks: [
          { id: 1, title: 'Tarea 1.1', completed: false, tieneUbicacion: true, latitud: 34.0522, longitud: -118.2437 },
          { id: 2, title: 'Tarea 1.2', completed: true, tieneUbicacion: false, latitud: 0, longitud: 0 },
          { id: 3, title: 'Tarea 1.3', completed: false, tieneUbicacion: true, latitud: 40.7128, longitud: -74.0060 },
        ],
      },
      {
        id: 2,
        name: 'Carpeta 2',
        tasks: [
          { id: 4, title: 'Tarea 2.1', completed: true, tieneUbicacion: false, latitud: 0, longitud: 0 },
          { id: 5, title: 'Tarea 2.2', completed: false, tieneUbicacion: true, latitud: 51.5074, longitud: -0.1278 },
        ],
      },
    ];
  }

  // Guardar carpetas en el almacenamiento
  private async saveFolders() {
    await Preferences.set({
      key: 'folders',
      value: JSON.stringify(this.foldersSubject.value),
    });
  }

  // Agregar una nueva tarea a una carpeta
  async addTaskToFolder(folderId: number, task: Task) {
    const folders = this.foldersSubject.getValue();
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      // Asignar un ID único a la tarea
      task.id = folder.tasks.length > 0 ? Math.max(...folder.tasks.map(t => t.id)) + 1 : 1;
      folder.tasks.push(task);
      this.foldersSubject.next(folders); // Actualizar el observable
      await this.saveFolders(); // Guardar en almacenamiento
    }
  }

  // Marcar una tarea como completada
  async toggleTaskCompletion(folderId: number, taskId: number) {
    const folders = this.foldersSubject.getValue();
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      const task = folder.tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
        await this.saveFolders();
      }
    }
  }

  // Eliminar una tarea
  async deleteTask(folderId: number, taskId: number) {
    const folders = this.foldersSubject.getValue();
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      folder.tasks = folder.tasks.filter(task => task.id !== taskId);
      this.foldersSubject.next(folders);
      await this.saveFolders();
    }
  }

  // Agregar una nueva carpeta
  async addFolder(name: string) {
    const folders = this.foldersSubject.getValue();
    const folder: Folder = {
      id: folders.length > 0 ? Math.max(...folders.map(f => f.id)) + 1 : 1,
      name,
      tasks: [],
    };
    folders.push(folder);
    this.foldersSubject.next(folders);
    await this.saveFolders();
  }
}
