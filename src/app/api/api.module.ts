import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApiModule } from './auth/auth-api.module';
import { PersonasApiModule } from './personas/personas-api.module';
import { PaisesApiModule } from './paises/paises-api.module';

/**
 * Módulo para Api.
 */
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AuthApiModule,
        PersonasApiModule,
        PaisesApiModule
    ]
})
export class ApiModule { }
