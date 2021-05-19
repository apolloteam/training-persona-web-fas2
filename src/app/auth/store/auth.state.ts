import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthApiService } from 'src/app/api/auth/auth-api.service';
import { AUTH_STATE_NAME } from 'src/app/store/app.state-model';
import * as actions from './auth.actions';
import { AuthStateModel } from './auth.state-model';
import * as resetActions from 'ngxs-reset-plugin';

/**
 * Implementa las acciones del módulo Auth.
 */
@State<AuthStateModel>({
    name: AUTH_STATE_NAME,
    defaults: {
        token: null,
        username: null
    }
})
@Injectable()
export class AuthState {

    /**
     * Creates an instance of auth state.
     * @param authApiService Administra operaciones del módulo auth del api.
     */
    constructor(private authApiService: AuthApiService) { }

    /**
     * Realiza el proceso de autenticación del usuario.
     * @param ctx Estado de la app.
     * @param action Acción que cambia el estado de la app.
     * @returns Confirmación de la acción.
     */
    @Action(actions.Login)
    // eslint-disable-next-line max-len
    public authLoginAction(ctx: StateContext<AuthStateModel>, action: actions.Login): Observable<string> {
        return this.authApiService.login(action.username, action.password)
            .pipe(
                tap((token: string) => ctx.patchState({
                    username: action.username,
                    token
                }))
            );
    }

    /**
     * Finaliza la sesión del usuario.
     * @param ctx Estado de la app.
     * @returns Confirmación de la acción.
     */
    @Action(actions.Logout)
    public logout(ctx: StateContext<AuthStateModel>): Observable<void> {
        // Se limpia individualmente AuthState porque el StateResetAll resetea el estado usando el estado guardado en LocalStorage.
        // AuthState es el único que se almacena en LocalStorage para mantener la sesión al refrescar la app.
        return ctx.dispatch(new resetActions.StateReset(AuthState))
            .pipe(
                switchMap(() => ctx.dispatch(new resetActions.StateResetAll(AuthState)))
            );

    }

}
