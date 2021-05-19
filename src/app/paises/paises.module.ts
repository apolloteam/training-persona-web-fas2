import { NgModule } from '@angular/core';
import { PaisesRoutingModule } from './paises-routing.module';
import { PaisesState } from './store/paises.state';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { PaisesFormComponent } from './form/paises-form.component';

/**
 * Módulo para Países.
 */
@NgModule({
    declarations: [PaisesFormComponent],
    imports: [
        SharedModule,
        PaisesRoutingModule,
        NgxsModule.forFeature([PaisesState])
    ]
})
export class PaisesModule { }
