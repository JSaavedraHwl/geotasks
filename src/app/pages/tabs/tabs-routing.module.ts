import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path:'tasks',
        loadChildren: () => import('../tasks/tasks.module').then((m)=> m.TasksPageModule)
      },
      {
        path:'settings',
        loadChildren: () => import('../configuracion/configuracion.module').then((m)=> m.ConfiguracionPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tasks',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tasks',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
