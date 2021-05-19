import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApiService } from './auth-api.service';

/**
 * Módulo para Auth Api.
 */
@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [AuthApiService]
})
export class AuthApiModule { }
