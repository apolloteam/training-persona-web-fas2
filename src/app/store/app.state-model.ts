import { AuthStateModel } from '../auth/store/auth.state-model';
import { PaisesStateModel as PaisesStateModel } from '../paises/store/paises.state-model';
import { PersonasStateModel as PersonasStateModel } from '../personas/store/personas.state-model';
import { SharedStateModel } from '../shared/store/shared.state-model';

/**
 * Estado general de la app.
 */
export interface AppStateModel {

  /** Modelo que representa el estado del módulo shared. */
  shared: SharedStateModel;

  /** Modelo que representa el estado del módulo auth. */
  authPerFas: AuthStateModel;

  /** Modelo que representa el estado del módulo persona. */
  personas: PersonasStateModel;

  /** Modelo que representa el estado del módulo país. */
  paises: PaisesStateModel;
}

/** Clave del módulo auth en el store. */
export const AUTH_STATE_NAME: string = 'authPerFas';

/** Clave del módulo persona en el store. */
export const PERSONAS_STATE_NAME: string = 'personas';

/** Clave del módulo pais en el store. */
export const PAISES_STATE_NAME: string = 'paises';

/** Clave del módulo shared en el store. */
export const SHARED_STATE_NAME: string = 'shared';
