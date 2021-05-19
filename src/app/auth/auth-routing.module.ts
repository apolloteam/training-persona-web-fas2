import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as routesConfig from '../config/routes.config';

/** Rutas del módulo auth. */
const routes: Routes = [
    {
        path: routesConfig.LOGIN,
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    }
];

/**
 * Módulo para Auth Routing.
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
