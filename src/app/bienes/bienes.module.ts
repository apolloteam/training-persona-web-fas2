import { NgModule } from '@angular/core';
import { BienesFormComponent } from './form/bienes-form.component';
import { SharedModule } from '../shared/shared.module';

/**
 * Módulo para bienes.
 */
@NgModule({
    declarations: [BienesFormComponent],
    imports: [
        SharedModule
    ]
})
export class BienesModule { }
