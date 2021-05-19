import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PagedList } from 'src/app/api/entities/paged-list';
import { Pais } from 'src/app/api/entities/pais';
import { PaisesApiService } from 'src/app/api/paises/paises-api.service';
import { PAISES_STATE_NAME } from 'src/app/store/app.state-model';
import * as actions from './paises.actions';
import { PaisesStateModel } from './paises.state-model';

/**
 * Implementa las acciones del módulo paises.
 */
@State<PaisesStateModel>({
    name: PAISES_STATE_NAME,
    defaults: {
        list: [],
        all: [],
        pageIndex: 1,
        pageSize: 10,
        totalItemCount: null,
        paisToEdit: null
    }
})
@Injectable()
export class PaisesState {

    /**
     * Creates an instance of pais state.
     * @param paisesApiService Administra operaciones del módulo Paises Api.
     */
    constructor(private paisesApiService: PaisesApiService) { }

    /**
     * Resetea el listado de países.
     * @param ctx Contenedor de estado de la app.
     */
    @Action(actions.ResetList)
    public resetList(ctx: StateContext<PaisesStateModel>): void {
        ctx.patchState({
            list: [],
            totalItemCount: null
        });
    }

    /**
     * Obtiene una lista de países.
     * @param ctx Contenedor de estado de la app.
     * @returns Lista de países.
     */
    @Action(actions.GetList, { cancelUncompleted: true })
    public getList(
        ctx: StateContext<PaisesStateModel>
    ): Observable<PagedList<Pais>> {
        ctx.patchState({ list: [] });
        const { pageIndex, pageSize }: PaisesStateModel = ctx.getState();
        const mockedQuery: string = '*';
        return this.paisesApiService.getPaises(pageIndex, pageSize, mockedQuery)
            .pipe(
                tap((response: PagedList<Pais>) => ctx.patchState({
                    list: response.items,
                    totalItemCount: response.totalItemCount
                }))
            );
    }

    /**
     * Obtiene todos los países.
     * @param ctx Contenedor de estado de la app.
     * @returns Lista de países.
     */
    @Action(actions.GetAll)
    public getAll(
        ctx: StateContext<PaisesStateModel>
    ): Observable<PagedList<Pais>> {
        const mockedQuery: string = '*';
        return this.paisesApiService.getPaises(1, 1000, mockedQuery)
            .pipe(
                tap((response: PagedList<Pais>) => ctx.patchState({ all: response.items }))
            );
    }

    /**
     * Setea valores de paginación.
     * @param ctx Contenedor de estado de la app.
     * @param action Acción que modifica el estado de la app.
     */
    @Action(actions.SetPagination)
    public setPagination(
        ctx: StateContext<PaisesStateModel>,
        action: actions.SetPagination
    ): void {
        const { pageIndex, pageSize }: actions.SetPagination = action;
        ctx.patchState({ pageIndex, pageSize });
    }

    /**
     * Setea el orden del listado.
     * @param ctx Contenedor de estado de la app.
     * @param action Acción que modifica el estado de la app.
     */
    @Action(actions.SetSort)
    public setSort(
        ctx: StateContext<PaisesStateModel>,
        action: actions.SetSort
    ): void {
        const { sort: { active: field, direction } }: actions.SetSort = action;
        const state: PaisesStateModel = ctx.getState();
        const sortedList: Pais[] = [...state.list];
        // Ordena el listado de países (en memoria).
        sortedList.sort((a: Pais, b: Pais) => {
            if (direction === 'asc') {
                if (a[field] > b[field]) {
                    return -1;
                }
                if (a[field] < b[field]) {
                    return 1;
                }
                return 0;
            } else {
                if (a[field] < b[field]) {
                    return -1;
                }
                if (a[field] > b[field]) {
                    return 1;
                }
                return 0;
            }
        });
        ctx.patchState({ list: sortedList });
    }

    /**
     * Crea un nuevo país.
     * @param ctx Contenedor de estado de la app.
     * @param action Acción que modifica el estado de la app.
     * @returns Confirmación de la acción.
     */
    @Action(actions.Create)
    public create(ctx: StateContext<PaisesStateModel>, action: actions.Create): Observable<void> {
        return this.paisesApiService.post(action.pais);
    }

    /**
     * Edita un país.
     * @param ctx Contenedor de estado de la app.
     * @param action Acción que modifica el estado de la app.
     * @returns Confirmación de la acción.
     */
    @Action(actions.Edit)
    public edit(ctx: StateContext<PaisesStateModel>, action: actions.Edit): Observable<void> {
        return this.paisesApiService.put(action.pais);
    }

    /**
     * Elimina un país.
     * @param ctx Contenedor de estado de la app.
     * @param action Acción que modifica el estado de la app.
     * @returns Confirmación de la acción.
     */
    @Action(actions.DeleteById)
    public deleteById(ctx: StateContext<PaisesStateModel>, { idPais }: actions.DeleteById): Observable<void> {
        return this.paisesApiService.deleteById(idPais);
    }

    /**
     * Obtiene un país para poder editarlo.
     * @param ctx Contenedor de estado de la app.
     * @param action Acción que modifica el estado de la app.
     * @returns País. 
     */
    @Action(actions.GetPaisToEdit)
    public getPaisToEdit(
        ctx: StateContext<PaisesStateModel>,
        action: actions.GetPaisToEdit): Observable<Pais> {
        return this.paisesApiService.getByIataCode(action.idPais)
            .pipe(
                tap((paisToEdit: Pais) => ctx.patchState({ paisToEdit }))
            );
    }

    /**
     * Resetea el país a editar.
     * @param ctx Contenedor de estado de la app.
     */
    @Action(actions.ResetPaisToEdit)
    public resetPaisToEdit(ctx: StateContext<PaisesStateModel>): void {
        ctx.patchState({ paisToEdit: null });
    }
}
