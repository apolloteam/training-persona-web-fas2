import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ApiErrorCodes } from '../api/entities/api-error-codes';
import { AppCodes } from '../entities/app-codes';
import { StatusMessage } from '../api/entities/status-message';
import { MessageModalService } from '../shared/message-modal/message-modal.service';

/**
 * Administra operaciones de errores.
 */
@Injectable()
export class ErrorHandlerService implements ErrorHandler {

    /**
     * Creates an instance of error handler service.
     * @param translateService Administra operaciones de i18n.
     * @param messageModalService Administra las operaciones del módulo Message Modal.
     */
    constructor(
        private translateService: TranslateService,
        private messageModalService: MessageModalService
    ) { }

    /**
     * Realiza el tratamiento genérico del error y muestra un mensaje asociado.
     * @param error Error.
     */
    /* eslint-disable */
    public handleError(error: any): void {

        /** 
         * FIX: al NO controlar una excepción en la implementación de un @Action la excepción es
         * lanzada dos veces por NGXS, una se maneja al realizar el disparch de la acciónen (component), 
         * y otra en este servicio.
         * Para evitar mostrar dos mensajes de error, se excluyen de este servicio los errores en
         * peticiones HTTP (!error?.status) ya que se asume que las acciones que realiza el request, 
         * controlan el error desde el componente y en caso de que no lo traten, lo vuelven a lanzar 
         * agregándole la propiedad handle.
         * Ref: https://github.com/ngxs/store/issues/803
         * Probablemente se resuelva en la versión 4 de NGXS.
         * Ref: https://github.com/ngxs/store/issues/1691
         */
        if (!error?.status || error.handle) {
            if (!environment.production) {
                console.error(error);
            }

            this.processException(error);
        }
    }
    /* eslint-enable */

    /**
     * Procesa excepciones y muestra un mensaje.
     * @param err Exception.
     * @returns Confirmación de mensaje.
     */
    /* eslint-disable */
    public processException(err: any): Promise<void> {

        const statusMessage: StatusMessage = err?.error
            ? { ...err.error }
            : {
                message: err?.message,
                descrip: err?.stack,
                errorCode: AppCodes?.ErrRunTimeException
            };

        statusMessage.uiErrorUniqueId = err?.error?.errorUniqueId || this.generateUUID();
        return this.showGeneralError(statusMessage);
    }
    /* eslint-enable */

    /**
     * Procesa y completa información del error recibido.
     * @param statusMessage Error de aplicación.
     * @returns Error de aplicación completo.
     */
    public showGeneralError(statusMessage: StatusMessage): Promise<void> {
        let titleKey: string = null;
        let messageKey: string = null;
        const interpolationParams: { [key: string]: string } = {};

        switch (statusMessage.errorCode) {

            case ApiErrorCodes.ErrAuthAccessTokenExpired:
                messageKey = 'ERROR.EXPIRED_SESSION';
                break;

            case AppCodes.ErrRunTimeException:
                messageKey = 'ERROR.RUNTIME.MESSAGE';
                titleKey = 'ERROR.RUNTIME.TITLE';
                interpolationParams.uiErrorUniqueId = statusMessage.uiErrorUniqueId;
                break;

            case ApiErrorCodes.ErrBadRequest:
            case ApiErrorCodes.ErrAuthAccessTokenInvalid:
            case ApiErrorCodes.ErrAuthInvalidAppKey:
            case ApiErrorCodes.ErrAuthUnsupportedGrantType:
            case ApiErrorCodes.ErrAuthAuthorizationHeader:
            default:
                interpolationParams.uiErrorUniqueId = statusMessage.uiErrorUniqueId;
                interpolationParams.code = statusMessage.errorCode || statusMessage.descrip;
                if (statusMessage.code === '404') {
                    titleKey = 'ERROR.NOT_FOUND.TITLE';
                    messageKey = 'ERROR.NOT_FOUND.MESSAGE';
                } else {
                    titleKey = 'ERROR.TITLE';
                    messageKey = 'ERROR.MESSAGE';
                }
        }

        statusMessage.uiErrorMessage = {
            title: titleKey ? this.translateService.instant(titleKey) : null,
            message: this.translateService.instant(messageKey, interpolationParams)
        };
        if (statusMessage.customData?.referrer) {
            statusMessage.uiErrorMessage.message += ` (${statusMessage.customData.referrer})`;
            statusMessage.uiErrorMessage.uiErrorUniqueId = statusMessage.uiErrorUniqueId;
        }
        return this.messageModalService.showError(statusMessage.uiErrorMessage);
    }

    /** 
     * Genera UUID.
     * @returns UUID.
     */
    public generateUUID(): string {

        let d: number = new Date().getTime();
        // eslint-disable-next-line
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            // Use high-precision timer if available
            d += performance.now();
        }

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
            // eslint-disable-next-line no-bitwise
            const r: number = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);

            // eslint-disable-next-line no-bitwise
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}
