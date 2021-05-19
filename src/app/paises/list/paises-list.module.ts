import { NgModule } from '@angular/core';

import { PaisesListRoutingModule } from './paises-list-routing.module';
import { PaisesListComponent } from './paises-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

/**
 * Módulo para Paises List.
 */
@NgModule({
    declarations: [PaisesListComponent],
    imports: [
        SharedModule,
        PaisesListRoutingModule
    ]
})
export class PaisesListModule { }
