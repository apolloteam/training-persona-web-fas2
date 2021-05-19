import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, filter, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Persona } from 'src/app/api/entities/persona';
import { AppHelperService } from 'src/app/app-helper.service';
import { AppStateModel } from 'src/app/store/app.state-model';
import { PersonasService } from '../personas.service';
import * as personasActions from '../store/personas.actions';
import * as paisesActions from '../../paises/store/paises.actions';
import * as routesConfig from '../../config/routes.config';
import { HttpApiError } from 'src/app/api/entities/http-api-error';
import { ApiErrorCodes } from 'src/app/api/entities/api-error-codes';
import { Pais } from 'src/app/api/entities/pais';
import { ActivatedRoute, Router } from '@angular/router';
import { Bien } from 'src/app/api/entities/bien';
import { PaisesFormComponent } from 'src/app/paises/form/paises-form.component';
import { BienesFormComponent } from 'src/app/bienes/form/bienes-form.component';
import { MessageModalService } from 'src/app/shared/message-modal/message-modal.service';
import { TimeZone } from 'src/app/api/entities/time-zone';

/**
 * Componente para la vista personas form.
 */
@Component({
    selector: 'app-personas-form',
    templateUrl: './personas-form.component.html',
    styleUrls: ['./personas-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PersonasFormComponent implements OnInit, OnDestroy {

    /** Lista de países. */
    @Select((state: AppStateModel) => state.paises.all)
    public paises$: Observable<Pais[]>;

    /** True si la vista está cargando datos o ejecutando una operación. False de lo contrario. */
    public loading: boolean;

    /** Referencia del formulario. */
    public formPersona: FormGroup;

    /** Datos de una Persona. */
    public persona: Persona;

    /** Lista de código de países. */
    public iataCodes: string[];

    /** Países cargados en la app. */
    public loadedPaises: { [key: string]: Pais };

    /** Identificador de una Persona. */
    public idPersona: number;

    /** Bienes de una  persona. */
    public bienes: Bien[] = [];

    /** Referencia para desuscribir observables del componente. */
    private destroy$: Subject<boolean> = new Subject<boolean>();

    /**
     * Creates an instance of personas form component.
     * @param translateService Administra operaciones de i18n.
     * @param messageModalService Administra las operaciones del módulo Message Modal.
     * @param router Administra operaciones de ruteo.
     * @param activatedRoute Administra operaciones de la ruta activa.
     * @param formBuilder Administra operaciones para implementar formularios reactivos.
     * @param appHelperService Herramientras para app.
     * @param personasService Administra las operaciones del módulo personas..
     * @param dialogService Servicio de dialog (angular material).
     * @param store Administra operaciones para manejar el estado de la app.
     */
    constructor(
        public translateService: TranslateService,
        private messageModalService: MessageModalService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        public appHelperService: AppHelperService,
        public personasService: PersonasService,
        public dialogService: MatDialog,
        public store: Store
    ) { }

    /**
     * Evento de inicialización del componente.
     */
    public ngOnInit(): void {

        // Se construye el formulario.
        this.buildForm();

        // Se obtienen los datos del store.
        this.store.select((state: AppStateModel) => state)
            .pipe(takeUntil(this.destroy$))
            .subscribe((state: AppStateModel) => {
                this.persona = state.personas.personaToEdit;
            });

        // Escucha el parámetro de idPersona de la url.
        // Se usa servicio de activatedRoute para escuchar parámetros de URL porque obtenerlos del store es confuso.
        // eslint-disable-next-line max-len
        // Ej: this.store.select((state: AppStateModel) => state.router.state.root.firstChild.firstChild.firstChild.firstChild.firstChild.params).
        this.activatedRoute.params
            .pipe(
                pluck('idPersona'),
                filter(idPersona => !!idPersona),
                distinctUntilChanged(),
                tap(() => this.loading = true),
                switchMap((idPersona: number) => {
                    this.idPersona = idPersona;
                    return this.store.dispatch(new personasActions.GetPersonaToEdit(idPersona));
                }),
                catchError((err: unknown) => {
                    this.loading = false;
                    return this.handleGetByIdError(err);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.fillFormByPersona();
                this.loading = false;
            });

        // Obtiene el listado de países completo.
        this.store.dispatch(new paisesActions.GetAll())
            .pipe(
                catchError((err: unknown) => this.handleGetAllPaisesError(err)),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    /**
     * Evento de destrucción del componente.
     */
    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    /**
     * Crea un nuevo país.
     */
    public createPais(): void {
        this.dialogService.open(PaisesFormComponent, {
            width: '70%',
            maxWidth: '500px',
            panelClass: 'paises-form-panel'
        }).afterClosed()
            .pipe(
                filter(hasChanges => !!hasChanges),
                tap(() => this.loading = true),
                switchMap(() => this.store.dispatch(new paisesActions.GetList())),
                catchError((err: unknown) => {
                    this.loading = false;
                    return this.handleGetAllPaisesError(err);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.loading = false);
    }

    /**
     * Agrega un nuevo país.
     */
    public addBien(): void {
        this.dialogService.open(BienesFormComponent, {
            width: '70%',
            maxWidth: '500px'
        })
            .afterClosed()
            .pipe(
                filter((bien: Bien) => !!bien),
                takeUntil(this.destroy$)
            )
            .subscribe((bien: Bien) => {
                const lastId: number = this.bienes.length ? this.bienes[this.bienes.length - 1].id : 0;
                this.bienes = [
                    ...this.bienes,
                    {
                        ...bien, id: lastId + 1
                    }
                ];

            });
    }

    /**
     * Elimina un bien de la persona.
     * @param idBien Identificador del bien.
     */
    public deleteBien(idBien: number): void {
        this.bienes = this.bienes.filter((bien: Bien) => bien.id !== idBien);
    }

    /**
     * Agrega un nuevo país.
     */
    public cancelForm(): void {
        this.router.navigateByUrl(`/${routesConfig.PERSONAS}/${routesConfig.PERSONAS_LIST}`);
    }

    /**
     * Envía los datos del formulario.
     */
    public submitForm(): void {
        this.loading = true;
        const persona: Persona = this.getPersonaByFormData();
        of(this.idPersona)
            .pipe(
                switchMap((idPersona: number) => {
                    if (idPersona) {
                        return this.store.dispatch(new personasActions.Edit(persona));
                    } else {
                        return this.store.dispatch(new personasActions.Create(persona));
                    }
                }),
                catchError((err: unknown) => {
                    this.loading = false;
                    return this.handleFormError(err);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.router.navigateByUrl(`/${routesConfig.PERSONAS}/${routesConfig.PERSONAS_LIST}`);
                this.loading = false;
            });
    }

    /**
     * Configura los campos del formulario.
     */
    private buildForm(): void {
        this.formPersona = this.formBuilder.group({
            // eslint-disable-next-line id-blacklist
            fullName: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            saving: null,
            savingQuote: null,
            enableNotifications: true,
            address: null,
            dateOfBirth: [null, Validators.required],
            gender: null,
            accountStatus: null,
            dateFormat: null,
            timeFormat: null,
            timeZoneName: null,
            nationality: null,
            lang: null,
            notes: null
        });
    }

    /**
     * Completa los campos del formulario con los datos de una persona.
     */
    private fillFormByPersona(): void {
        this.bienes = this.persona.bienes;
        this.formPersona.patchValue({
            fullName: this.persona.nombreCompleto,
            email: this.persona.eMail,
            saving: this.persona.totalAhorro,
            savingQuote: this.persona.porcAhorro,
            enableNotifications: this.persona.recibirNotificaciones,
            address: this.persona.direccion,
            dateOfBirth: this.persona.fechaNacimiento,
            gender: this.persona.sexo,
            accountStatus: this.persona.estado,
            dateFormat: this.persona.regionalData.dateFormat,
            timeFormat: this.persona.regionalData.timeFormat,
            timeZoneName: this.persona.regionalData.timeZone?.timeZoneName,
            lang: this.persona.regionalData.languageCode,
            nationality: this.persona.nacionalidad,
            notes: this.persona.obs
        });
    }

    /**
     * Mapea los datos del formulario a una persona.
     * @returns Datos de una persona.
     */
    private getPersonaByFormData(): Persona {
        const {
            fullName: nombreCompleto,
            email: eMail,
            saving: totalAhorro,
            savingQuote: porcAhorro,
            enableNotifications: recibirNotificaciones,
            address: direccion,
            dateOfBirth: fechaNacimiento,
            gender: sexo,
            accountStatus: estado,
            dateFormat,
            timeFormat,
            timeZoneName,
            nationality: nacionalidad,
            lang: languageCode,
            notes: obs
        } = this.formPersona.value;
        const timeZone: TimeZone = this.personasService.getTimeZones()
            .find((itemtimeZone: TimeZone) => itemtimeZone.timeZoneName === timeZoneName);
        const persona: Persona = {
            id: this.persona?.id,
            nombreCompleto,
            eMail,
            totalAhorro,
            porcAhorro,
            recibirNotificaciones,
            direccion,
            fechaNacimiento,
            sexo,
            estado,
            nacionalidad,
            obs,
            bienes: this.bienes,
            regionalData: {
                dateFormat,
                timeFormat,
                timeZone,
                languageCode
            },
            fechaActualizo: new Date(),
            fechaCreo: this.persona?.fechaCreo,
            lat: this.persona?.lat,
            lon: this.persona?.lon
        };
        return persona;
    }

    /**
     * Maneja errores del formulario de personas.
     * @param apiError Error durante el envío del formulario de personas.
     * @returns Manejo del error. 
     */
    private handleFormError(apiError: HttpApiError): Observable<void> {
        switch (apiError.error.errorCode) {
            case ApiErrorCodes.ErrPersonaEmailExist:
                this.messageModalService.showError({ message: this.translateService.instant('PEROSNAS.FORM.ERROR.EMAIL_EXIST') });
                break;
            case ApiErrorCodes.ErrPersonaObsContienePalabraNoValida:
                this.messageModalService.showError({ message: this.translateService.instant('PEROSNAS.FORM.ERROR.EMAIL_EXIST') });
                break;
            default:
                return throwError({ ...apiError, handle: true });
        }
        return of();
    }

    /**
     * Maneja errores del listado de personas.
     * @param apiError Error durante la carga del listado de personas.
     * @returns Manejo del error. 
     */
    private handleGetByIdError(apiError: HttpApiError): Observable<void> {
        return throwError({ ...apiError, handle: true });
    }

    /**
     * Maneja errores de la obtención de países.
     * @param apiError Error durante la obtención de países.
     * @returns Manejo del error. 
     */
    private handleGetAllPaisesError(apiError: HttpApiError): Observable<void> {
        return throwError({ ...apiError, handle: true });
    }
}
