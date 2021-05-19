import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppStateModel } from '../store/app.state-model';
import { AppCodes } from '../entities/app-codes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Administra las operaciones del módulo auth.
 */
@Injectable()
export class AuthService {

    /**
     * Creates an instance of auth service.
     * @param store Administra operaciones para manejar el estado de la app.
     */
    constructor(private store: Store) { }

    /**
     * Devuelve true si el usuario tiene autenticación válida. False de lo contrario.
     * @returns True si el usuario tiene autenticación válida. False de lo contrario.
     */
    public isAuthorized(): Observable<boolean> {
        return this.store.selectOnce((state: AppStateModel) => state.authPerFas?.token)
            .pipe(
                map((token: string) => token === AppCodes.TokenValido)
            );
    }
}
