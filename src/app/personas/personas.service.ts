import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountStatus } from '../api/entities/account-status';
import { Sexo } from '../api/entities/sexo';
import { TimeZone } from '../api/entities/time-zone';

/**
 * Administra las operaciones del módulo personas.
 */
@Injectable()
export class PersonasService {

    /**
     * Creates an instance of personas service.
     * @param translateService Administra operaciones de i18n.
     */
    constructor(public translateService: TranslateService) { }

    /**
     * Devuelve una lista de los estados de cuenta existentes.
     * @returns Lista de los estados de cuenta existentes.
     */
    public getAccountStatusList(): AccountStatus[] {
        const ret: AccountStatus[] = [
            AccountStatus.Active,
            AccountStatus.Inactive,
            AccountStatus.Suspended
        ];
        return ret;
    }

    /**
     * Devuelve la descripción de un código de estado de cuentas.
     * @param status Código de estado de cuentas.
     * @returns La descripción de un código de estado de cuentas.
     */
    public getTextByAccountStatus(status: AccountStatus): string {
        let translateKey: string = '';

        switch (status) {
            case AccountStatus.Active:
                translateKey = 'PERSONAS.STATUS.ACTIVE';
                break;
            case AccountStatus.Inactive:
                translateKey = 'PERSONAS.STATUS.INACTIVE';
                break;
            case AccountStatus.Suspended:
                translateKey = 'PERSONAS.STATUS.SUSPENDED';
                break;
            default:
                translateKey = 'PERSONAS.STATUS.UNKNOWN';
        }
        const ret: string = this.translateService.instant(translateKey);
        return ret;
    }

    /**
     * Devuelve una lista de géneros.
     * @returns Lista de géneros.
     */
    public getGenders(): Sexo[] {
        const ret: Sexo[] = [
            Sexo.Femenino,
            Sexo.Masculino,
            Sexo.SinEspecificar
        ];
        return ret;
    }

    /**
     * Devuelve la descripción de un código de sexo.
     * @param gender Código del género.
     * @returns Descripción del código de sexo.
     */
    public getTextByGender(gender: Sexo): string {
        let translateKey: string = '';

        switch (gender) {
            case Sexo.Femenino:
                translateKey = 'PERSONAS.FORM.GENDER.FEMALE';
                break;
            case Sexo.Masculino:
                translateKey = 'PERSONAS.FORM.GENDER.MALE';
                break;
            default:
                translateKey = 'PERSONAS.FORM.GENDER.UNSPECIFIED';
        }
        const ret: string = this.translateService.instant(translateKey);
        return ret;
    }

    /**
     * Devuelve una lista de formatos de fechas.
     * @returns Lista de formatos de fechas.
     */
    public getDateFormats(): string[] {
        const ret: string[] = [
            'dd/mm/yyyy',
            'mm/dd/yyyy'
        ];
        return ret;
    }

    /**
     * Devuelve una lista de formatos de hora.
     * @returns Lista de formatos de hora.
     */
    public getTimeFormats(): string[] {
        const ret: string[] = [
            'HH:mm',
            'HH:mm:ss',
            'hh:mm:ss tt'
        ];
        return ret;
    }

    /**
     * Devuelve una lista de timezone.
     * @returns Lista de timezone.
     */
    public getTimeZones(): TimeZone[] {

        const timeZoneBA: TimeZone = {
            timeZoneId: '1',
            timeZoneName: 'America/Argentina/Buenos_Aires',
            dstOffset: '-03:00',
            rawOffset: '-03:00'
        };

        const timeZoneBR: TimeZone = {
            timeZoneId: '2',
            timeZoneName: '	America/Sao_Paulo',
            dstOffset: '-02:00',
            rawOffset: '-03:00'
        };
        const timeZoneUS: TimeZone = {
            timeZoneId: '3',
            timeZoneName: 'US/Alaska',
            dstOffset: '-08:00',
            rawOffset: '-09:00'
        };
        const ret: TimeZone[] = [timeZoneBA, timeZoneBR, timeZoneUS];

        return ret;
    }

    /**
     * Devuelve una lista de idiomas.
     * @returns Lista de idiomas.
     */
    public getLanguageCodes(): string[] {
        const ret: string[] = [
            'es',
            'en',
            'pt'
        ];
        return ret;
    }

    /**
     * Devuelve una lista de categorías de bienes.
     * @returns Lista de categorías de bienes.
     */
    public getCategoriesBienes(): string[] {
        const ret: string[] = [
            'Mueble',
            'Inmueble',
            'De uso',
            'Otro'
        ];
        return ret;
    }
}
