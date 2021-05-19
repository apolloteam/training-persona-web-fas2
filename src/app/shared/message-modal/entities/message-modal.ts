import { MessageModalType } from './message-modal.type';
import { MessageModalAction } from './message-modal-action';

/**
 * Mensaje para mostrar en un modal.
 */
export interface MessageModal {

    /** Tipo de mensaje */
    modalType?: MessageModalType;

    /** Título del mensaje a mostrar. */
    title?: string;

    /** Contenido del mensaje a mostrar. */
    message?: string;

    /** Acciones del mensaje. */
    actions?: MessageModalAction[];

    /** Clases de estilos para el modal. */
    modalClass?: string;

    /** True si muestra una barra de progreso. False de lo contrario. */
    showLinnearProgress?: boolean;
}
