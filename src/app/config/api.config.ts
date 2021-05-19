import { environment } from 'src/environments/environment';
import { ApiConfig } from '../api/entities/api-config';

/**
 * Provee configuración necesaria para api.
 */
export const apiConfig: ApiConfig = {
    appKey: 'traslada.suppliers',
    baseUrl: environment.apiBaseUrl,
    protocol: environment.httpProtocol,
    authSubDomainName: 'persona2',
    personasSubDomainName: 'persona2',
    paisesSubDomainName: 'persona2'
};
