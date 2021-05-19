import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMessage } from 'src/app/api/entities/error-message';
import { MessageModal } from './entities/message-modal';
import { MessageModalType } from './entities/message-modal.type';
import { MessageModalComponent } from './message-modal.component';

/**
 * Administra las operaciones del módulo Message Modal.
 */
@Injectable()
export class MessageModalService {

    /**
     * Creates an instance of error message modal service.
     * @param dialogService Servicio de dialog.
     * @param ngZone Administra operaciones de detección de cambios en la app (Angular).
     */
    constructor(
        private translateService: TranslateService,
        private dialogService: MatDialog,
        private ngZone: NgZone) { }

    /**
     * Muestra un mensaje en un modal.
     * @param config Contenido del mensaje.
     * @param panelClass Clase para personalizar el panel contenedor.
     * @returns Referencia del modal.
     */
    public show(config: MessageModal, panelClass?: string): MatDialogRef<MessageModalComponent> {
        const messageModal: MatDialogRef<MessageModalComponent> = this.dialogService.open(MessageModalComponent, {
            data: config,
            panelClass
        });
        return this.ngZone.run(() => messageModal);
    }

    /** 
     * Muestra mensaje de error.
     * @param errorMessage Mensaje a mostrar al usuario.
     * @returns Confirmación de recepción del error.
     */
    public showError(errorMessage: ErrorMessage): Promise<void> {
        const messageModal: MessageModal = {
            ...errorMessage,
            modalType: MessageModalType.Error,
            actions: [{ text: this.translateService.instant('CLOSE') }]
        };
        return this.show(messageModal).afterClosed().toPromise();
    }
}
