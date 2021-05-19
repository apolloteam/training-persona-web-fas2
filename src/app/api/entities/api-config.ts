/**
 * Configuración del api.
 */
export interface ApiConfig {

    /** AppKey de la aplicación. */
    appKey: string;

    /** Base url del api. */
    baseUrl: string;

    /** Protocolo http. */
    protocol: string;

    /** Nombre del recurso auth. */
    authSubDomainName?: string;

    /** Nombre del recurso booking. */
    personasSubDomainName?: string;

    /** Nombre del recurso suppliers. */
    paisesSubDomainName?: string;
}
