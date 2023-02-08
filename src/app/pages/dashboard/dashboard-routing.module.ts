import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GeneralityComponent} from "./generality/generality.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: `Thống kê`
    },
    children: [
      {
        path: 'generality',
        component: GeneralityComponent,
        data: {
          title: 'Tổng quan'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
