
/**
 * Item del menú de navegación.
 */
export interface NavItem {

    /** Texto del item de navegación. */
    text: string;

    /** Nombre para identificar el item de navegación */
    name?: string;

    /** Ícono del item de navegación. */
    icon?: string;

    /** True si el item está deshabilitado. False de lo contrario. */
    disabled?: boolean;

    /** Url de la ruta a navegar. */
    url?: string;

    /** True si el item debe dibujar un divisor. False de lo contrario. */
    divider?: boolean;

    /** Parámetros de la ruta a navegar. */
    stateParams?: { [key: string]: string | boolean | number };

    /** Badge a mostrar. */
    badge?: number;
}
