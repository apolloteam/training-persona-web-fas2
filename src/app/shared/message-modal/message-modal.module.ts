import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageModalComponent } from './message-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MessageModalService } from './message-modal.service';

/**
 * Módulo para message-modal.
 */
@NgModule({
    declarations: [MessageModalComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatProgressBarModule
    ],
    providers: [MessageModalService]
})
export class MessageModalModule { }
