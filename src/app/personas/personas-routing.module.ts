import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as routesConfig from '../config/routes.config';

const routes: Routes = [
    {
        path: routesConfig.PERSONAS_LIST,
        loadChildren: () => import('./list/personas-list.module').then(m => m.PersonaListModule)
    },
    {
        path: routesConfig.PERSONAS_FORM,
        loadChildren: () => import('./form/personas-form.module').then(m => m.PersonaFormModule)
    },
    {
        path: '',
        redirectTo: routesConfig.PERSONAS_LIST,
        pathMatch: 'full'
    }
];

/**
 * Módulo para Personas Routing.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonaRoutingModule { }
