import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { ApiModule } from './api/api.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { AppHelperService } from './app-helper.service';
import { ngxsConfig } from './config/ngxs.config';
import { environment } from 'src/environments/environment';

/** AoT requires an exported function for factories. */

/**
 * AoT requires an exported function for factories.
 * @param http Administra operaciones Http.
 * @returns Function for factories.
 */
export const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, './assets/i18n/', '.json');

/**
 * A fake factory which gets all the handlers.
 * @returns A fake factory which gets all the handlers.
 */
export const noop: () => void = () => () => void 0;

/**
 * Módulo para App.
 */
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        ApiModule,
        AuthModule,
        HttpClientModule,
        ErrorHandlerModule,
        NgxsModule.forRoot([], ngxsConfig),
        NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
        NgxsResetPluginModule.forRoot(),
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        AppHelperService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
