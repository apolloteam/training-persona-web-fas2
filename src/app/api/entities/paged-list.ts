/**
 * Contenedor de lista paginada de objetos del tipo especificado.
 */
export interface PagedList<TItems> {

    /** Lista de items a devolver (en una página). */
    items: TItems[];

    /** Total general de items. */
    totalItemCount: number;

    /** Índice de la página que se está devolviendo. */
    pageIndex: number;

    /** Cantidad de items por página. */
    pageSize: number;
}
