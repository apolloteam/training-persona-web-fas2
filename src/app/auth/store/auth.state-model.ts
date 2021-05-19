/**
 * Modelo que representa el estado del módulo auth.
 */
export interface AuthStateModel {

    /** Token de sesión. */
    token: string;

    /** Nombre del usuario logeado. */
    username: string;
}
