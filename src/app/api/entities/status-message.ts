import { ErrorMessage } from './error-message';

/** 
 * Contiene un mensaje de estado para responder a una petición que produjo un error.
 */
export interface StatusMessage {

    /** HTTP response status code (e.g. 401). */
    code: string;

    /** HTTP response status code description (e.g. "Unauthorized"). */
    descrip: string;

    /** Date and time (UTC). */
    timeStamp: string;

    /** Identificador único de error para poder referenciarlo con el log de excepciones. */
    errorUniqueId?: string;

    /** Error code for business rules treatment (e.g. "ERR.AUTH.ACCESSTOKEN.INVALID"). */
    errorCode?: string;

    /** Error message (e.g. "AccessToken invalid."). */
    message: string;

    /** List of validation errors. */
    validationErrors?: { [key: string]: string | number | boolean };

    /** Datos adicionales del error. */
    customData?: { [key: string]: string | number | boolean };

    /** Código único de error generado en el cliente. */
    uiErrorUniqueId?: string;

    /** Error con data de presentación. */
    uiErrorMessage?: ErrorMessage;
}

