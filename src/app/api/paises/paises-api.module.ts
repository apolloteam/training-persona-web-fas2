import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesApiService } from './paises-api.service';

/**
 * Módulo para Países Api.
 */
@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [PaisesApiService]
})
export class PaisesApiModule { }
