import { NgxsConfig } from '@ngxs/store/src/symbols';
import { environment } from 'src/environments/environment';

/** Configuración de la librería NGXS. */
export const ngxsConfig: NgxsConfig = {
    developmentMode: !environment.production,
    selectorOptions: {
        suppressErrors: false,
        injectContainerState: false
    },
    compatibility: {
        strictContentSecurityPolicy: true
    },
    executionStrategy: null,
    defaultsState: {}
};
