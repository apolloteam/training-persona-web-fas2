import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisesListComponent } from './paises-list.component';

const routes: Routes = [
    {
        path: '',
        component: PaisesListComponent
    }
];

/**
 * Módulo para Paises List Routing.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaisesListRoutingModule { }
