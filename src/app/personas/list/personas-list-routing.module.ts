import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasListComponent } from './personas-list.component';

const routes: Routes = [
    {
        path: '',
        component: PersonasListComponent
    }
];

/**
 * Módulo para Personas List Routing.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonaListRoutingModule { }
