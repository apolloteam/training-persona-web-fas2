import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { HttpApiError } from 'src/app/api/entities/http-api-error';
import { ApiErrorCodes } from 'src/app/api/entities/api-error-codes';
import { Pais } from 'src/app/api/entities/pais';
import { AppCodes } from 'src/app/entities/app-codes';
import { MessageModalService } from 'src/app/shared/message-modal/message-modal.service';
import * as paisesActions from '../store/paises.actions';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';

/**
 * Componente para la vista paises form.
 */
@Component({
    selector: 'app-paises-form',
    templateUrl: './paises-form.component.html',
    styleUrls: ['./paises-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaisesFormComponent implements OnInit, OnDestroy {

    /** Referencia del formulario. */
    public formPais: FormGroup;

    /** True si la app se encuentra cargando información. False de lo contrario. */
    public loading: boolean = false;

    /** Referencia para desuscribir observables del componente. */
    private destroy$: Subject<boolean> = new Subject<boolean>();

    /**
     * Creates an instance of change itinerary component.
     * @param translateService Administra operaciones de i18n.
     * @param messageModalService Administra las operaciones del módulo Message Modal.
     * @param formBuilder Administra operaciones para implementar formularios reactivos.
     * @param store Administra operaciones para manejar el estado de la app.
     * @param dialogRef Servicio de dialog (angular material).
     * @param model Modelo del cambio de itinerario.
     */
    constructor(
        public translateService: TranslateService,
        private messageModalService: MessageModalService,
        private formBuilder: FormBuilder,
        private store: Store,
        public dialogRef: MatDialogRef<Pais, boolean>,
        @Inject(MAT_DIALOG_DATA)
        public model: Pais) { }

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
     * Cierra el modal.
     * @param hasChanges True si hubo cambio de datos en el modal. False de lo contrario.
     */
    public closeModal(hasChanges: boolean): void {
        this.dialogRef.close(hasChanges);
    }

    /**
     * Realiza el envío del forumario.
     */
    public submit(): void {
        this.loading = true;
        const { codigoIata, nombre } = this.formPais.value;
        const pais: Pais = { codigoIata, nombre };
        of(this.model)
            .pipe(
                switchMap((model: Pais) => {
                    if (!!model) {
                        return this.store.dispatch(new paisesActions.Edit(pais));
                    } else {
                        return this.store.dispatch(new paisesActions.Create(pais));
                    }
                }),
                catchError((err: unknown) => {
                    this.loading = false;
                    return this.handleFormError(err);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.closeModal(true);
                this.loading = false;
            });
    }

    /**
     * Configura los campos del formulario.
     */
    private buildForm(): void {
        this.formPais = this.formBuilder.group({
            nombre: [this.model?.nombre, Validators.required],
            codigoIata: [this.model?.codigoIata, Validators.required]
        });
    }

    /**
     * Maneja errores del formulario de un países.
     * @param apiError Error del formulario de países.
     * @returns Confirmación del manejo del error. 
     */
    private handleFormError(apiError: HttpApiError): Observable<void> {
        switch (apiError?.error?.errorCode) {
            case AppCodes.UserCancel:
                break;
            case ApiErrorCodes.ErrPaisIataCodeExist:
                this.messageModalService.showError({ message: this.translateService.instant('PAISES.FORM.ERROR.IATA_EXIST') });
                break;
            default:
                return throwError({ ...apiError, handle: true });
        }
        return of();
    }
}
