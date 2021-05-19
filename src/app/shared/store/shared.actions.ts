import { NavItem } from 'src/app/entities/nav-items';

const CONTEXT: string = '[Shared]';

/** Define los items de navegación del menú. */
export class SetNavItems {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} Set nav items`;

    /**
     * Creates an instance of set nav items.
     * @param navItems Items de navegación.
     */
    constructor(public navItems: NavItem[]) { }
}
