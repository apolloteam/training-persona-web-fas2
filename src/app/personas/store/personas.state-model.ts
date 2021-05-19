import { Persona } from 'src/app/api/entities/persona';

/**
 * Modelo que representa el estado del módulo personas.
 */
export interface PersonasStateModel {

    /** Lista de personas. */
    list: Persona[];

    /** Persona a editar. */
    personaToEdit: Persona;

    /** Cantidad total resultados en la búsqueda. */
    totalItemCount: number;

    /** Número de página. */
    pageIndex: number;

    /** Cantidad de resultados por página. */
    pageSize: number;
}
