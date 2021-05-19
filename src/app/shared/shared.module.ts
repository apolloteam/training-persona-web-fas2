import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { MessageModalModule } from './message-modal/message-modal.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { SharedState } from './store/shared.state';

/**
 * Módulo para Shared.
 */
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AngularMaterialModule,
        RouterModule,
        MessageModalModule,
        TranslateModule,
        NgxsModule.forFeature([SharedState])
    ],
    providers: [],
    exports: [
        CommonModule,
        AngularMaterialModule,
        RouterModule,
        MessageModalModule,
        TranslateModule
    ]
})
export class SharedModule { }
