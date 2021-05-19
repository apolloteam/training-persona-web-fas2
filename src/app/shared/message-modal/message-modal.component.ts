import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageModal } from './entities/message-modal';
import { MessageModalType } from './entities/message-modal.type';
import { TranslateService } from '@ngx-translate/core';

/**
 * Componente para la vista message-modal.
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'at-message-modal',
    templateUrl: './message-modal.component.html',
    styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent {

    /**
     * Creates an instance of AtMessageModalComponent.
     * @param translateService Administra operaciones de i18n.
     * @param dialogRef Servicio de dialog (angular material).
     * @param messageModalData Metadata del mensaje.
     * @memberof AtMessageModalComponent
     */
    constructor(
        public translateService: TranslateService,
        public dialogRef: MatDialogRef<MessageModalComponent>,
        @Inject(MAT_DIALOG_DATA) public messageModalData: MessageModal) { }

    /**
     * Cierra el modal del filtro.
     */
    public closeModal(): void {
        this.dialogRef.close();
    }

    /**
     * Devuelve true si el modal es de tipo error.
     * @returns True si el modal es de tipo error.
     */
    public isError(): boolean {
        return this.messageModalData.modalType === MessageModalType.Error;
    }

    /**
     * Devuelve true si el modal es de tipo success.
     * @returns True si el modal es de tipo success.
     */
    public isSuccess(): boolean {
        return this.messageModalData.modalType === MessageModalType.Success;
    }

    /**
     * Devuelve true si el modal es de tipo info.
     * @returns True si el modal es de tipo info.
     */
    public isInfo(): boolean {
        return this.messageModalData.modalType === MessageModalType.Info;
    }

    /**
     * Devuelve true si el modal es de tipo warning.
     * @returns True si el modal es de tipo warning.
     */
    public isWarning(): boolean {
        return this.messageModalData.modalType === MessageModalType.Warning;
    }
}
