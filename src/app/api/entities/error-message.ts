/** 
 * Mensaje a mostrar al usuario.
 */
export interface ErrorMessage {

    /** Título para el error. */
    title?: string;

    /** Mensaje detallado del error. */
    message: string;

    /** Código único de error generado en el cliente. */
    uiErrorUniqueId?: string;
}
