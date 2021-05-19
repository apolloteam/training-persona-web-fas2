import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasApiService } from './personas-api.service';

/**
 * Módulo para Personas Api.
 */
@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [PersonasApiService]
})
export class PersonasApiModule { }
