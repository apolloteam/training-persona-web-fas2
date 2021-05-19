import { Pais } from 'src/app/api/entities/pais';

/**
 * Modelo que representa el estado del módulo países.
 */
export interface PaisesStateModel {

    /** Lista de id de países para representar el listado. */
    list: Pais[];

    /** Lista de todos los países. */
    all: Pais[];

    /** Países a editar. */
    paisToEdit: Pais;

    /** Cantidad total resultados en la búsqueda. */
    totalItemCount: number;

    /** Número de página. */
    pageIndex: number;

    /** Cantidad de resultados por página. */
    pageSize: number;
}
