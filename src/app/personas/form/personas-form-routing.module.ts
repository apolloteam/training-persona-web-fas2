import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasFormComponent } from './personas-form.component';

const routes: Routes = [
    {
        path: '',
        component: PersonasFormComponent,
        pathMatch: 'full'
    },
    {
        path: ':idPersona',
        component: PersonasFormComponent
    }
];

/**
 * Módulo para Personas Form Routing.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonaFormRoutingModule { }
