import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {ManagersCrudComponent} from './components/managers-crud/managers-crud.component';


const routes: Routes = [
  {path: '', component: ManagersCrudComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagersRouterModule {
}
