import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as routesConfig from '../config/routes.config';
import { MasterPageComponent } from './master-page.component';

const routes: Routes = [{
    path: '',
    component: MasterPageComponent,
    children: [
        {
            path: routesConfig.PERSONAS,
            loadChildren: () => import('../personas/personas.module').then(m => m.PersonasModule)
        },
        {
            path: routesConfig.PAISES,
            loadChildren: () => import('../paises/paises.module').then(m => m.PaisesModule)
        },
        {
            path: '',
            redirectTo: routesConfig.PERSONAS,
            pathMatch: 'full'
        }
    ]
}];

/**
 * Configuración de rutas para el módulo Master Page.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterPageRoutingModule { }
