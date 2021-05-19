import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Pais } from 'src/app/api/entities/pais';
import { AppStateModel } from 'src/app/store/app.state-model';
import * as paisesActions from '../store/paises.actions';
import { PageEvent } from '@angular/material/paginator';
import { HttpApiError } from 'src/app/api/entities/http-api-error';
import { combineLatest, Observable, of, Subject, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MessageModal } from 'src/app/shared/message-modal/entities/message-modal';
import { AppCodes } from 'src/app/entities/app-codes';
import { ApiErrorCodes } from 'src/app/api/entities/api-error-codes';
import { MessageModalType } from 'src/app/shared/message-modal/entities/message-modal.type';
import { PaisesFormComponent } from '../form/paises-form.component';
import { Sort } from '@angular/material/sort';
import { MessageModalService } from 'src/app/shared/message-modal/message-modal.service';
import { SelectionModel } from '@angular/cdk/collections';
import { catchError, filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

/**
 * Componente para la vista paises list.
 */
@Component({
    selector: 'app-paises-list',
    templateUrl: './paises-list.component.html',
    styleUrls: ['./paises-list.component.scss']
})
export class PaisesListComponent implements OnInit, OnDestroy {

    /** Lista de países. */
    @Select((state: AppStateModel) => state.paises.list)
    public listPaises$: Observable<Pais[]>;

    /** Cantidad total resultados en la búsqueda. */
    @Select((state: AppStateModel) => state.paises.totalItemCount)
    public totalItemCount: Observable<number>;

    /** Número de página. */
    @Select((state: AppStateModel) => state.paises.pageIndex)
    public pageIndex: Observable<number>;

    /** Cantidad de resultados por página. */
    @Select((state: AppStateModel) => state.paises.pageSize)
    public pageSize: Observable<number>;

    /** True si la vista está cargando datos o ejecutando una operación. False de lo contrario. */
    public loading: boolean;

    /** Configuración de columnas. */
    public columnsToDisplay: string[] = ['selection', 'codigoIata', 'nombre', 'actions'];

    /** Referencia de países seleccionados. */
    public paisesSelection: SelectionModel<string>;

    /** Referencia para desuscribir observables del componente. */
    private destroy$: Subject<boolean> = new Subject<boolean>();

    /**
     * Creates an instance of paises list component.
     * @param translateService Administra operaciones de i18n.
     * @param messageModalService Administra las operaciones del módulo Message Modal.
     * @param dialogService Servicio de dialog.
     * @param store Administra operaciones para manejar el estado de la app.
     */
    constructor(
        public translateService: TranslateService,
        private messageModalService: MessageModalService,
        private dialogService: MatDialog,
        public store: Store
    ) {
        this.paisesSelection = new SelectionModel<string>(true, []);
    }

    /**
     * Evento de inicialización del componente.
     */
    public ngOnInit(): void {

        this.loading = true;
        this.store.dispatch(new paisesActions.GetList())
            .pipe(
                catchError((err: unknown) => {
                    this.loading = false;
                    return this.handleGetListError(err);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.loading = false;
            });
    }

    /**
     * Evento de destrucción del componente.
     */
    public ngOnDestroy(): void {
        this.store.dispatch(new paisesActions.ResetList());
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
        this.store.dispatch(new paisesActions.SetPagination(pageEvent.pageIndex + 1, pageEvent.pageSize))
            .pipe(
                switchMap(() => this.store.dispatch(new paisesActions.GetList())),
                catchError((err: unknown) => {
                    this.loading = false;
                    return this.handleGetListError(err);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.loading = false);
    }

    /**
     * Elimna un país.
     * @param codigoIata Evento click.
     */
    public deletePaisById(codigoIata: string): void {
        // Configuración de message modal.
        const messageModal: MessageModal = {
            message: this.translateService.instant('PAISES.LIST.DELETE.MESSAGE'),
            modalType: MessageModalType.Warning,
            actions: [{
                text: this.translateService.instant('NO'),
                value: false
            }, {
                text: this.translateService.instant('YES'),
                value: true,
                pallete: 'primary',
                actionClass: 'mat-raised-button'
            }]
        };
        this.messageModalService.show(messageModal).afterClosed()
            .pipe(
                filter((confirmation) => !!confirmation),
                tap(() => this.loading = true),
                switchMap(() => this.store.dispatch(new paisesActions.ResetList())),
                switchMap(() => this.store.dispatch(new paisesActions.DeleteById(codigoIata))),
                switchMap(() => this.store.dispatch(new paisesActions.GetList())),
                tap(),
                catchError((err: unknown) => {
                    this.loading = false;
                    return this.handleDeleteError(err);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.loading = false);
    }

    /**
     * Crea un nuevo país.
     */
    public createPais(): void {
        this.openPaisForm();
    }

    /**
     * Edita un país.
     * @param pais País a editar.
     */
    public editPais(pais: Pais): void {
        this.openPaisForm(pais);
    }

    /**
     * Ordena resultados de la tabla.
     * @param sort Orden aplicado.
     */
    public handleSortEvent(sort: Sort): void {
        this.store.dispatch(new paisesActions.SetSort(sort));
    }

    /**
     * Maneja el evento de seleccionar / desseleccionar todos.
     * @param event Evento del usuario.
     */
    public handleToggleAll(event?: MouseEvent): void {
        if (event) {
            combineLatest([
                this.isAllSelected(),
                this.listPaises$
            ])
                .pipe(
                    take(1),
                    takeUntil(this.destroy$)
                )
                .subscribe((data: [boolean, Pais[]]) => {
                    data[1].forEach((itemPais: Pais) =>
                        data[0]
                            ? this.paisesSelection.deselect(itemPais.codigoIata)
                            : this.paisesSelection.select(itemPais.codigoIata)
                    );
                });
        }
    }

    /**
     * Maneja el evento de seleccionar / desseleccionar todos.
     * @returns {Observable<boolean>}  Emite true si todos los items están seleccionados. False de lo contrario.
     */
    public isAllSelected(): Observable<boolean> {
        return this.listPaises$
            .pipe(
                map((paisesList: Pais[]) => {
                    const ret: boolean = paisesList.every(
                        (itemPais: Pais) => this.paisesSelection.selected.indexOf(itemPais.codigoIata) > -1);
                    return ret;
                }),
                takeUntil(this.destroy$)
            );
    }

    /**
     * Exporta la lista de países seleccionados.
     */
    public export(): void {
        const paisesToShow: string = this.paisesSelection.selected.join(' - ');
        this.messageModalService.show({ message: paisesToShow });
    }

    /**
     * Abre formulario de países.
     * @param [pais] Datos de un país (edición).
     */
    private openPaisForm(pais?: Pais): void {
        this.dialogService.open(PaisesFormComponent, {
            data: pais,
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
                    return this.handleGetListError(err);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.loading = false);
    }

    /**
     * Maneja errores del listado de países.
     * @param apiError Error durante la carga del listado de países.
     * @returns Manejo del error.
     */
    private handleGetListError(apiError: HttpApiError): Observable<void> {
        return throwError({ ...apiError, handle: true });
    }

    /**
     * Maneja errores durante la eliminación de un país.
     * @param apiError Error durante la eliminació de un país.
     * @returns Confirmación del manejo del error. 
     */
    private handleDeleteError(apiError: HttpApiError): Observable<void> {
        switch (apiError?.error?.errorCode) {
            case AppCodes.UserCancel:
                break;
            case ApiErrorCodes.ErrPaisIataCodeExist:
                this.messageModalService.showError({ message: this.translateService.instant('PAISES.LIST.DELETE.ERROR') });
                break;
            default:
                return throwError({ ...apiError, handle: true });
        }
        return of();
    }
}
