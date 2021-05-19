import * as routesConfig from './routes.config';
import { NavItem } from '../entities/nav-items';

export const PERSONA_NAV_KEY: string = 'persona_list';

export const PERSONA_LIST_ITEM: NavItem = {
    name: PERSONA_NAV_KEY,
    text: 'MASTER_PAGE.NAV.PERSONA_LIST',
    icon: 'person_outline',
    url: `/${routesConfig.PERSONAS}/${routesConfig.PERSONAS_LIST}`
};

export const PAIS_NAV_KEY: string = 'pais_list';

export const PAIS_LIST_ITEM: NavItem = {
    name: PAIS_NAV_KEY,
    text: 'MASTER_PAGE.NAV.PAIS_LIST',
    icon: 'public',
    url: `/${routesConfig.PAISES}/${routesConfig.PAISES_LIST}`,
    divider: true
};

export const LOGOUT_KEY: string = 'logout';

export const LOGOUT_ITEM: NavItem = {
    name: LOGOUT_KEY,
    text: 'MASTER_PAGE.NAV.LOGOUT',
    icon: 'power_settings_new'
};

export const NAV_ITEMS: NavItem[] = [
    PERSONA_LIST_ITEM,
    PAIS_LIST_ITEM,
    LOGOUT_ITEM
];
