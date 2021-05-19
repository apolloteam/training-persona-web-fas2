import { NgModule } from '@angular/core';

import { PersonaListRoutingModule } from './personas-list-routing.module';
import { PersonasListComponent } from './personas-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonasModule } from '../personas.module';

/**
 * Módulo para Personas List.
 */
@NgModule({
    declarations: [PersonasListComponent],
    imports: [
        SharedModule,
        PersonaListRoutingModule,
        PersonasModule
    ]
})
export class PersonaListModule { }
