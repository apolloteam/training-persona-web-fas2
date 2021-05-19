import { NavItem } from 'src/app/entities/nav-items';

/**
 * Modelo que representa el estado del módulo shared.
 */
export interface SharedStateModel {

    /** Items del menú de navegación. */
    navItems: NavItem[];

    /** Verisón de la aplicación. */
    appVersion: string;
}
