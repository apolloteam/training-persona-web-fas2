/**
 * Interfaz para la configuración de ambiente.
 */
export interface Environment {

    /** True si el ambiente es prod. False de lo contrario. */
    production: boolean;

    /** Protocolo HTTP (incluir "://", ejemplo: "http://"). */
    httpProtocol: string;

    /** URL base de las APIs (sin el protololo, ejemplo: "miapi.com"). */
    apiBaseUrl: string;
}
