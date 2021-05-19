import { NgModule } from '@angular/core';
import { PersonaRoutingModule } from './personas-routing.module';
import { NgxsModule } from '@ngxs/store';
import { PersonasState } from './store/personas.state';
import { SharedModule } from '../shared/shared.module';
import { PersonasService } from './personas.service';
import { PaisesModule } from '../paises/paises.module';
import { BienesModule } from '../bienes/bienes.module';

/**
 * Módulo para Personas.
 */
@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        PersonaRoutingModule,
        PaisesModule,
        BienesModule,
        NgxsModule.forFeature([PersonasState])
    ],
    providers: [PersonasService]
})
export class PersonasModule { }
