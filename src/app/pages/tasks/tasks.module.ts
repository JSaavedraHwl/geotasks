import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksPageRoutingModule } from './tasks-routing.module';

import { TasksPage } from './tasks.page';
import { MapaComponent } from 'src/app/componentes/mapa/mapa.component';
import { SharedComponentsModule } from 'src/app/componentes/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [TasksPage]
})
export class TasksPageModule {}
