import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as routesConfig from '../config/routes.config';

const routes: Routes = [
    {
        path: routesConfig.PAISES_LIST,
        loadChildren: () => import('./list/paises-list.module').then(m => m.PaisesListModule)
    },
    {
        path: '',
        redirectTo: routesConfig.PAISES_LIST,
        pathMatch: 'full'
    }
];

/**
 * Módulo para Paises Routing.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaisesRoutingModule { }
