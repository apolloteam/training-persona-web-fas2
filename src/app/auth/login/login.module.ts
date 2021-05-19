import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';

/**
 * Módulo para Login.
 */
@NgModule({
    declarations: [LoginComponent],
    imports: [
        SharedModule,
        LoginRoutingModule
    ]
})
export class LoginModule { }
