import { Environment } from './environment.entity';

/**
 * Configuración del ambiente de producción.
 */
export const environment: Environment = {
    production: true,
    httpProtocol: 'http://',
    apiBaseUrl: 'traslada.com.ar'
};
