import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { AppStateModel } from 'src/app/store/app.state-model';
import * as loginActions from '../store/auth.actions';
import { ApiErrorCodes } from 'src/app/api/entities/api-error-codes';
import { HttpApiError } from 'src/app/api/entities/http-api-error';
import { MessageModalService } from 'src/app/shared/message-modal/message-modal.service';
import { Router } from '@angular/router';
import { catchError, takeUntil } from 'rxjs/operators';

/**
 * Componente para la vista Login.
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    /** Verisón de la app. */
    @Select((state: AppStateModel) => state.shared.appVersion)
    public appVersion$: Observable<string>;

    /** True si la vista está cargando datos o ejecutando una operación. False de lo contrario. */
    public loading: boolean;

    /** Referencia del formulario. */
    public formLogin: FormGroup;

    /** True si la contraseña se visibiliza. False de lo contrario. */
    public revealedPass = false;

    /** Referencia para desuscribir observables del componente. */
    private destroy$: Subject<boolean> = new Subject<boolean>();

    /**
     * Creates an instance of login component.
     * @param translateService Administra operaciones de i18n.
     * @param messageModalService Servicio que muestra mensajes en un modal.
     * @param router Administra operaciones de ruteo.
     * @param formBuilder Administra operaciones para implementar formularios reactivos.
     * @param store Administra operaciones para manejar el estado de la app.
     */
    constructor(
        public translateService: TranslateService,
        private messageModalService: MessageModalService,
        private router: Router,
        private formBuilder: FormBuilder,
        private store: Store
    ) { }

    /**
     * Evento de inicialización del componente.
     */
    public ngOnInit(): void {

        this.buildForm();
    }

    /**
     * Evento de destrucción del componente.
     */
    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    /**
     * Despacha acción de autenticación.
     */
    public login(): void {

        const { username, password } = this.formLogin.value;
        this.loading = true;

        this.store.dispatch(new loginActions.Login(username, password))
            .pipe(
                catchError((err: unknown) => this.handleLoginError(err)),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                // Redirije al root de la app para que levante la ruta configurada por defecto.
                this.router.navigateByUrl('');
            });

        this.loading = false;
    }

    /**
     * Oculta o releva el contenido de la contraseña.
     * @param $event Evento de click.
     */
    public toogleRevealedPass($event: MouseEvent): void {
        $event.preventDefault();
        this.revealedPass = !this.revealedPass;
    }

    /**
     * Configura los campos del formulario reactivo.
     */
    private buildForm(): void {
        this.formLogin = this.formBuilder.group({
            username: [null, Validators.required],
            password: [null, [Validators.required, Validators.minLength(4), Validators.pattern(/\S/)]]
        });
    }

    /**
     * Maneja errores de login.
     * @param apiError Error durante el login.
     * @returns Confirmación del manejo del error.
     */
    private handleLoginError(apiError: HttpApiError): Observable<void> {
        switch (apiError?.error?.errorCode) {
            case ApiErrorCodes.ErrAuthInvalidCredentials:
                this.messageModalService.showError({ message: this.translateService.instant('AUTH.LOGIN.ERROR.CREDENTIALS') });
                break;

            case ApiErrorCodes.ErrAuthNoLoginPrivilege:
                this.messageModalService.showError({ message: this.translateService.instant('AUTH.LOGIN.ERROR.PRIVILEGES') });
                break;

            case ApiErrorCodes.ErrAuthInactiveAccount:
                this.messageModalService.showError({ message: this.translateService.instant('AUTH.LOGIN.ERROR.INACTIVE_ACCOUNT') });
                break;

            default:
                return throwError({ ...apiError, handle: true });
        }

        return of();
    }
}
