import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import * as routesConfig from '../config/routes.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Controla el acceso a las rutas que requieren Autenticación.
 */
@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

    /**
     * Creates an instance of auth guard.
     * @param authService Administra operaciones de autenticación.
     * @param router Administra operaciones del enrutado de la app.
     */
    constructor(
        private authService: AuthService,
        private router: Router) { }

    /**
     * Devuelve true si el usuario está autorizado. Se lo redirije de lo contrario.
     * @returns True si está autorizado. False de lo contrario.
     */
    public canActivate(): Observable<boolean | UrlTree> {
        return this.authService.isAuthorized()
            .pipe(
                map((isAuthorized: boolean) => isAuthorized || this.router.createUrlTree([`/${routesConfig.AUTH}/${routesConfig.LOGIN}`]))
            );
    }

    /**
     * Devuelve true si un módulo puede ser cargado.
     * @returns True si el módulo puede ser cargado. False de lo contrario. 
     */
    public canLoad(): Observable<boolean> {
        return this.authService.isAuthorized()
            .pipe(
                map((isAuthorized: boolean) => isAuthorized)
            );
    }
}
