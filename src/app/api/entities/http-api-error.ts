import { StatusMessage } from './status-message';

/**
 * Error de una petición http hacia nuestras Apis.
 */
export interface HttpApiError {

    /** Error devuelto por el Api (StatusMessage). */
    error?: StatusMessage;

    /** Status code HTTP. */
    status?: number;
}
