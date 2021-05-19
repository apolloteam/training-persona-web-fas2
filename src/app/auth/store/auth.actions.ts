const CONTEXT: string = '[AUTH]';

/**
 * Realiza el proceso de autenticación del usuario.
 */
export class Login {

  /** Identificador de la acción. */
  public static readonly type = `${CONTEXT} Login`;

  /**
   * Creates an instance of login.
   * @param username Nombre de usuario.
   * @param password Contraseña.
   */
  constructor(public username: string, public password: string) { }
}

/**
 * Finaliza la sesión del usuario.
 */
export class Logout {

  /** Identificador de la acción. */
  public static readonly type = `${CONTEXT} Logout`;
}
