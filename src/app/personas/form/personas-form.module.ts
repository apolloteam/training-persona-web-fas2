import { NgModule } from '@angular/core';

import { PersonaFormRoutingModule } from './personas-form-routing.module';
import { PersonasFormComponent } from './personas-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonasModule } from '../personas.module';

/**
 * Módulo para Personas Form.
 */
@NgModule({
    declarations: [PersonasFormComponent],
    imports: [
        SharedModule,
        PersonaFormRoutingModule,
        PersonasModule
    ]
})
export class PersonaFormModule { }
