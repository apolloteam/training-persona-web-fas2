import { registerLocaleData } from '@angular/common';
import localeEsAR from '@angular/common/locales/es-AR';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { IconType } from './entities/icon-type';
import * as moment from 'moment';

/**
 * Herramientas para app.
 */
@Injectable()
export class AppHelperService {

    /**
     * Creates an instance of app helper service.
     * @param translateService Administra operaciones de i18n.
     * @param iconRegistry Servicio para registrar íconos custom en la app.
     * @param sanitizer Servicio que ayuda a interpretar valores de forma segura.
     */
    constructor(
        private translateService: TranslateService,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer
    ) { }

    /**
     * Inicializa la configuración de la aplicación.
     */
    public initConfigApp(): void {

        /** Define el idioma de la app. */
        registerLocaleData(localeEsAR, 'es-AR');
        this.translateService.setDefaultLang('es');
        moment.locale('es');

        /** Agrega íconos custom a la librería material. */
        this.registerIcon(IconType.SVG, 'exportExcel');
    }

    /**
     * Devuelve un identificador único por cada item para facilitar la detección de cambios de angular.
     * @param idx Número de posición del item.
     * @param _item Item.
     * @returns Identificador único por item para facilitar la detección de cambios de angular.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public trackByField(fieldByTrack: string): (idx: number, _item: any) => string {
        return (idx: number, item: unknown) => `${item[fieldByTrack]}`;
    }

    /**
     * Devuelve un identificador único por cada item para facilitar la detección de cambios de angular.
     * @param idx Número de posición del item.
     * @param item Item.
     * @returns Identificador único por item para facilitar la detección de cambios de angular.
     */
    public trackByIndex(idx: number): string {
        const ret: string = `${idx}`;
        return ret;
    }

    /**
     * Registra íconos para ser usados en la app.
     * @param type Tipo de ícono.
     * @param name Nombre del ícono.
     */
    private registerIcon(type: IconType, name: string): void {
        this.iconRegistry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(`assets/${type}/${name}.${type}`));
    }
}
