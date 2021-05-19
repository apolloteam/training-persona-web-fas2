import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PagedList } from 'src/app/api/entities/paged-list';
import { Persona } from 'src/app/api/entities/persona';
import { PersonasApiService } from 'src/app/api/personas/personas-api.service';
import { PERSONAS_STATE_NAME } from 'src/app/store/app.state-model';
import * as actions from './personas.actions';
import { PersonasStateModel } from './personas.state-model';

/**
 * Implementa las acciones del módulo persona.
 */
@State<PersonasStateModel>({
    name: PERSONAS_STATE_NAME,
    defaults: {
        list: [],
        totalItemCount: null,
        pageIndex: 1,
        pageSize: 10,
        personaToEdit: null
    }
})
@Injectable()
export class PersonasState {

    /**
     * Creates an instance of personas state.
     * @param personasApiService Administra operaciones del módulo Personas Api.
     */
    constructor(private personasApiService: PersonasApiService) { }

    /**
     * Resetea el listado de personas.
     * @param ctx Contenedor de estado de la app.
     */
    @Action(actions.ResetList)
    public resetList({ patchState }: StateContext<PersonasStateModel>): void {
        patchState({
            list: [],
            totalItemCount: null
        });
    }

    /**
     * Obtiene una lista de personas.
     * @param ctx Contenedor de estado de la app.
     * @returns Lista de personas.
     */
    @Action(actions.GetList, { cancelUncompleted: true })
    public getList(ctx: StateContext<PersonasStateModel>): Observable<PagedList<Persona>> {
        const { pageIndex, pageSize }: PersonasStateModel = ctx.getState();

        ctx.patchState({ list: [] });

        return this.personasApiService.getPersonas(pageIndex, pageSize, '*')
            .pipe(
                tap((response: PagedList<Persona>) => {
                    ctx.patchState({
                        list: response.items,
                        totalItemCount: response.totalItemCount
                    });
                })
            );
    }

    /**
     * Setea valores de paginación.
     * @param ctx Contenedor de estado de la app.
     * @param action Acción que modifica el estado de la app.
     */
    @Action(actions.SetPagination)
    public setPagination(
        ctx: StateContext<PersonasStateModel>,
        action: actions.SetPagination): void {
        const { pageIndex, pageSize }: actions.SetPagination = action;
        ctx.patchState({ pageIndex, pageSize });
    }

    /**
     * Crea una nueva persona.
     * @param ctx Contenedor de estado de la app.
     * @param action Acción que modifica el estado de la app.
     * @returns Confirmación de la acción.
     */
    @Action(actions.Create)
    public create(
        ctx: StateContext<PersonasStateModel>,
        action: actions.Create): Observable<void> {
        return this.personasApiService.post(action.persona);
    }

    /**
     * Edita una persona.
     * @param ctx Contenedor de estado de la app.
     * @param action Acción que modifica el estado de la app.
     * @returns Confirmación de la acción.
     */
    @Action(actions.Edit)
    public edit(
        ctx: StateContext<PersonasStateModel>,
        action: actions.Edit): Observable<void> {
        return this.personasApiService.put(action.persona);
    }

    /**
     * Elimina una persona.
     * @param ctx Contenedor de estado de la app.
     * @param action Acción que modifica el estado de la app.
     * @returns Confirmación de la acción.
     */
    @Action(actions.DeleteById)
    public deleteById(
        ctx: StateContext<PersonasStateModel>,
        action: actions.DeleteById): Observable<void> {
        return this.personasApiService.deleteById(action.idPersona);
    }

    /**
     * Obtiene una persona para poder editarla.
     * @param ctx Contenedor de estado de la app.
     * @param action Acción que modifica el estado de la app.
     * @returns Una persona.
     */
    @Action(actions.GetPersonaToEdit)
    public getPersonaToEdit(
        ctx: StateContext<PersonasStateModel>,
        action: actions.GetPersonaToEdit): Observable<Persona> {
        return this.personasApiService.getById(action.idPersona)
            .pipe(
                tap((personaToEdit: Persona) => ctx.patchState({ personaToEdit }))
            );
    }

    /**
     * Resetea la persona a editar.
     * @param ctx Contenedor de estado de la app.
     */
    @Action(actions.ResetPersonaToEdit)
    public resetPersonaToEdit(ctx: StateContext<PersonasStateModel>): void {
        ctx.patchState({ personaToEdit: null });
    }
}
