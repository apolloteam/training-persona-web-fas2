import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, throwError } from 'rxjs';
import { Persona } from 'src/app/api/entities/persona';
import { HttpApiError } from 'src/app/api/entities/http-api-error';
import { AppStateModel } from 'src/app/store/app.state-model';
import { PageEvent } from '@angular/material/paginator';
import * as personaActions from '../store/personas.actions';
import * as routesConfig from '../../config/routes.config';
import { AccountStatus } from 'src/app/api/entities/account-status';
import { MatMenuTrigger } from '@angular/material/menu';
import { MessageModalService } from 'src/app/shared/message-modal/message-modal.service';
import { MessageModal } from 'src/app/shared/message-modal/entities/message-modal';
import { Router } from '@angular/router';
import { catchError, filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ApiErrorCodes } from 'src/app/api/entities/api-error-codes';

/**
 * Componente para la vista Personas List.
 */
@Component({
    selector: 'app-personas-list',
    templateUrl: './personas-list.component.html',
    styleUrls: ['./personas-list.component.scss']
})
export class PersonasListComponent implements OnInit, OnDestroy {

    /** Lista de personas. */
    @Select((state: AppStateModel) => state.personas.list)
    public list$: Observable<Persona[]>;

    /** Cantidad total resultados en la búsqueda. */
    @Select((state: AppStateModel) => state.personas.totalItemCount)
    public totalItemCount$: Observable<number>;

    /** Número de página. */
    @Select((state: AppStateModel) => state.personas.pageIndex)
    public pageIndex$: Observable<number>;

    /** Cantidad de resultados por página. */
    @Select((state: AppStateModel) => state.personas.pageSize)
    public pageSize$: Observable<number>;

    /** Referencia del menú de acciones sobre la persona. */
    @ViewChild(MatMenuTrigger)
    public trigger: MatMenuTrigger;

    /** True si la vista está cargando datos o ejecutando una operación. False de lo contrario. */
    public loading: boolean;

    /** Configuración de columnas para representar el item. */
    public columnsItem: string[] = ['status', 'name', 'extra', 'dateOfBirth', 'actions'];

    /** Configuración de columnas para representar el item. */
    public columnsDetail: string[] = ['detail'];

    /** Referencia del item de persona expandido. */
    public expandedIdPersona: number = null;

    /** Referencia para desuscribir observables del componente. */
    private destroy$: Subject<boolean> = new Subject<boolean>();

    /**
     * Creates an instance of personas list component.
     * @param router Administra operaciones de ruteo.
     * @param translateService Administra operaciones de i18n.
     * @param messageModalService Administra las operaciones del módulo Message Modal.
     * @param store Administra operaciones para manejar el estado de la app.
     */
    constructor(
        private router: Router,
        public translateService: TranslateService,
        private messageModalService: MessageModalService,
        public store: Store
    ) { }

    /**
     * Evento de inicialización del componente.
     */
    public ngOnInit(): void {

        this.loading = true;
        this.store.dispatch(new personaActions.GetList())
            .pipe(
                catchError((err: unknown) => {
                    this.loading = false;
                    return this.handleGetListException(err);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.loading = false);
    }

    /**
     * Evento de destrucción del componente.
     */
    public ngOnDestroy(): void {
        this.store.dispatch(new personaActions.ResetList());
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    /**
     * Maneja el evento de actualización de paginador.
     * @param pageEvent Datos de paginación.
     */
    public handlePaginatorEvent(pageEvent: PageEvent): void {

        this.loading = true;

        // El pageIndex de Angular Material comienza en 0, en el API en 1. 
        this.store.dispatch(new personaActions.SetPagination(pageEvent.pageIndex + 1, pageEvent.pageSize))
            .pipe(
                switchMap(() => this.store.dispatch(new personaActions.GetList())),
                catchError((err: unknown) => {
                    this.loading = false;
                    return this.handleGetListException(err);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.loading = false);

        /* 
        Ejemplo de varios dispatch encadenados y sincronizados:
        this.store.dispatch(new personaActions.SetPagination(pageIndex + 1, pageSize))
            .pipe(
                tap(()=> console.log('SetPagination............')),
                switchMap(() => this.store.dispatch(new personaActions.GetList())),
                tap(()=> console.log('GetList............')),
                switchMap(() => this.store.dispatch(new personaActions.GetPersonaToEdit(1))),
                tap(()=> console.log('GetPersonaToEdit(1)............')),
                switchMap(() => this.store.dispatch(new personaActions.GetPersonaToEdit(2))),
                tap(()=> console.log('GetPersonaToEdit(2)............')),
                catchError((err: unknown) => {
                    this.loading = false;
                    return this.handleGetListException(err);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.loading = false);
         */
    }

    /**
     * Devuelve true si el estado de la persona es eliminado. False de lo contrario.
     * @param persona Datos de una persona.
     * @returns True si el estado de la persona es eliminado. False de lo contrario.
     */
    public isDeletedStatus(persona: Persona): boolean {
        const ret: boolean = persona.estado === AccountStatus.Deleted;
        return ret;
    }

    /**
     * Devuelve true si el estado de la persona es active. False de lo contrario.
     * @param persona Datos de una persona.
     * @returns True si el estado de la persona es active. False de lo contrario.
     */
    public isActiveStatus(persona: Persona): boolean {
        const ret: boolean = persona.estado === AccountStatus.Active;
        return ret;
    }

    /**
     * Devuelve true si el estado de la persona es inactive. False de lo contrario.
     * @param persona Datos de una persona.
     * @returns True si el estado de la persona es inactive. False de lo contrario.
     */
    public isInactiveStatus(persona: Persona): boolean {
        const ret: boolean = persona.estado === AccountStatus.Inactive;
        return ret;
    }

    /**
     * Devuelve true si el estado de la persona es suspended. False de lo contrario.
     * @param persona Datos de una persona.
     * @returns True si el estado de la persona es suspended. False de lo contrario.
     */
    public isSuspendedStatus(persona: Persona): boolean {
        const ret: boolean = persona.estado === AccountStatus.Suspended;
        return ret;
    }

    /**
     * Devuelve el texto que representa el estado de la persona.
     * @param persona Datos de una persona.
     * @returns Texto que representa el estado de la persona.
     */
    public getStatusText(persona: Persona): string {
        let keyTranslate: string = null;
        switch (persona.estado) {
            case AccountStatus.Active:
                keyTranslate = 'PERSONAS.STATUS.ACTIVE';
                break;
            case AccountStatus.Inactive:
                keyTranslate = 'PERSONAS.STATUS.INACTIVE';
                break;
            case AccountStatus.Deleted:
                keyTranslate = 'PERSONAS.STATUS.DELETED';
                break;
            case AccountStatus.Suspended:
                keyTranslate = 'PERSONAS.STATUS.SUSPENDED';
                break;
            default:
                keyTranslate = 'PERSONAS.STATUS.UNKOWN';
        }
        return this.translateService.instant(keyTranslate);
    }

    /**
     * Redirije al formulario para crear una persona.
     * @param event Evento click. 
     */
    public createPersona(event: MouseEvent): void {
        event.stopPropagation();
        this.trigger.closeMenu();
        this.router.navigateByUrl(`/${routesConfig.PERSONAS}/${routesConfig.PERSONAS_FORM}`);
    }

    /**
     * Redirije al formulario para editar una persona.
     * @param event Evento click.
     * @param persona Datos de una persona.
     */
    public editPersona(event: MouseEvent, persona: Persona): void {
        event.stopPropagation();
        this.trigger.closeMenu();
        this.router.navigateByUrl(`/${routesConfig.PERSONAS}/${routesConfig.PERSONAS_FORM}/${persona.id}`);
    }

    /**
     * Redirije al formulario para editar una persona.
     * @param event Evento click.
     * @param persona Datos de una persona.
     */
    public deletePersona(event: MouseEvent, persona: Persona): void {
        event.stopPropagation();
        this.trigger.closeMenu();
        this.openDeletePersonaConfirmation()
            .pipe(
                filter((confirmation) => !!confirmation),
                tap(() => this.loading = true),
                switchMap(() => this.store.dispatch(new personaActions.DeleteById(persona.id))),
                switchMap(() => this.store.dispatch(new personaActions.GetList())),
                catchError((err: unknown) => {
                    this.loading = false;
                    return this.handleDeletePersonaError(err);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.loading = false);
    }

    /**
     * Maneja el evento al abrir el menú de acciones.
     * @param event Evento click.
     */
    public handleOpenMenuEvent(event: MouseEvent): void {
        event.stopPropagation();
    }

    /**
     * Expande el detalle de una persona.
     * @param idPersona Identificador de una persona.
     */
    public setExpandedDetail(idPersona: number): void {
        this.expandedIdPersona = this.expandedIdPersona === idPersona ? null : idPersona;
    }

    /**
     * Pide confirmación para eliminar una persona.
     * @returns Confirmación.
     */
    private openDeletePersonaConfirmation(): Observable<boolean> {
        const deletePersonaConfirmation: MessageModal = {
            message: this.translateService.instant('PERSONAS.LIST.DELETE_WARNING'),
            actions: [{
                text: this.translateService.instant('NO'),
                value: false,
                actionClass: 'bg-white text-grey-900'
            }, {
                text: this.translateService.instant('YES'),
                value: true,
                pallete: 'primary',
                actionClass: 'mat-raised-button'
            }]
        };
        return this.messageModalService.show(deletePersonaConfirmation).afterClosed();
    }

    /**
     * Maneja errores al intentar eliminar una persona.
     * @param apiError Error al intentar eliminar una persona.
     * @returns Manejo del error. 
     */
    private handleDeletePersonaError(apiError: HttpApiError): Observable<void> {
        switch (apiError?.error?.errorCode) {
            case ApiErrorCodes.ErrPersonaNotFound:
                this.messageModalService.showError({ message: this.translateService.instant('PERSONAS.LIST.ERROR.DELETE_NOT_FOUND') });
                break;
            default:
                return throwError({ ...apiError, handle: true });
        }
    }

    /**
     * Maneja errores del listado de personas.
     * @param apiError Error durante la carga del listado de personas.
     * @returns Manejo del error. 
     */
    private handleGetListException(apiError: HttpApiError): Observable<void> {
        return throwError({ ...apiError, handle: true });
    }
}
