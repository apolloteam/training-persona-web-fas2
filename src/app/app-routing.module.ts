import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import * as routesConfig from './config/routes.config';

const routes: Routes = [
    {
        path: routesConfig.AUTH,
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        loadChildren: () => import('./master-page/master-page.module').then(m => m.MasterPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

/**
 * Configuración de rutas para el módulo app.
 */
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
