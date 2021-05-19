import { AccountStatus } from './account-status';
import { RegionalData } from './regional-data';
import { Bien } from './bien';
import { Sexo } from './sexo';

/** 
 * Datos de una Persona.
 */
export interface Persona {

    /** Identificador de la entidad. */
    id: number;

    /** Apellido y nombre/s. */
    nombreCompleto: string;

    /** Dirección de correo electrónico. */
    eMail: string;

    /** Fecha de creación de este registro (UTC). */
    fechaCreo: Date;

    /** Fecha de la última modificación de este registro (UTC). */
    fechaActualizo: Date;

    /** Importe total de los ahorros. */
    totalAhorro: number;

    /** Porcentaje de ahorro sobre el sueldo. */
    porcAhorro: number;

    /** Observaciones o comentarios. */
    obs: string;

    /** Dirección completa. */
    direccion: string;

    /** Latitud de la dirección. */
    lat: number;

    /** Longitud de la dirección. */
    lon: number;

    /** Estado de la persona. */
    estado: AccountStatus;

    /** Fecha de nacimiento. */
    fechaNacimiento: Date;

    /** Determina se se le envían o no notificaciones. */
    recibirNotificaciones: boolean;

    /** Información regional. */
    regionalData: RegionalData;

    /** Bienes personales. */
    bienes: Bien[];

    /** País de nacimiento. */
    nacionalidad: string;

    /** Tipo de sexo (usar clase Sexo). */
    sexo: Sexo;
}
