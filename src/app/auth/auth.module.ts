import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './auth.guard';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/auth.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';

/**
 * Módulo para Auth.
 */
@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        AuthRoutingModule,
        NgxsModule.forFeature([AuthState]),
        NgxsStoragePluginModule.forRoot({
            key: [AuthState]
        })
    ],
    providers: [
        AuthGuard,
        AuthService
    ]
})
export class AuthModule { }
