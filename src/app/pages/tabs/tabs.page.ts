import { Component, OnInit } from '@angular/core';
interface Task {
  id: number;
  title: string;
  completed: boolean;
}
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() { }

  tasksFolder1: Task[] = [
    { id: 1, title: 'Tarea 1.1', completed: false },
    { id: 2, title: 'Tarea 1.2', completed: true },
    { id: 3, title: 'Tarea 1.3', completed: false },
  ];

  // Ejemplo de datos para la carpeta 2
  tasksFolder2: Task[] = [
    { id: 4, title: 'Tarea 2.1', completed: true },
    { id: 5, title: 'Tarea 2.2', completed: false },
  ];

  ngOnInit() {
  }


}
