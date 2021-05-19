/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Constantes para códigos de error de Excepciones y StatusMessage (api).
 */
export enum ApiErrorCodes {

	/** Only grant_type=password and refresh_token requests are accepted by this server. */
	ErrAuthUnsupportedGrantType = 'ERR.AUTH.UNSUPPORTED_GRANT_TYPE',

	/** Requested invalid or incomplete */
	ErrValidation = 'ERR.VALIDATION',

	/** The Authorization header is missing or has an invalid format (format: Authorization:Bearer {yourToken}) */
	ErrAuthAuthorizationHeader = 'ERR.AUTH.AUTHORIZATIONHEADER',

	/** Credenciales inválidas. */
	ErrAuthInvalidCredentials = 'ERR.AUTH.INVALIDCREDENTIALS',

	/** Cuenta de Empresa o Pasajero inactiva. */
	ErrAuthInactiveAccount = 'ERR.AUTH.INANCTIVEACCOUNT',

	/** Pasajero sin privilegio de login. */
	ErrAuthNoLoginPrivilege = 'ERR.AUTH.NOLOGINPRIVILEGE',

	/** AccessToken inválido. */
	ErrAuthAccessTokenInvalid = 'ERR.AUTH.ACCESSTOKEN.INVALID',

	/** AccessToken vencido. */
	ErrAuthAccessTokenExpired = 'ERR.AUTH.ACCESSTOKEN.EXPIRED',

	/** Valor de llave AppKey inválida (no encontrada).  */
	ErrAuthInvalidAppKey = 'ERR.AUTH.INVALIDAPPKEY',

	/** Ya existe una Persona con ese email. */
	ErrPersonaEmailExist = 'ERR.PERSONA.EMAILEXIST',

	/** Ya existe un país con ese código IATA. */
	ErrPaisIataCodeExist = 'ERR.PAIS.IATAEXIST',

	/** Al mandar "prueba" en las observaciones simula un error de negocio.  */
	ErrPersonaPruebaValidacionBusiness = 'ERR.PERSONA.PRUEBAVALIDACIONBUSINESS',

	/** Persona no encontrada al buscar por id. */
	ErrPersonaNotFound = 'ERR.PERSONA.NOTFOUND',

	/** Ya existe una Persona con ese email. */
	ErrPersonaObsContienePalabraNoValida = 'ERR.PERSONA.OBSCONTIENEPALABRANOVALIDA',

	/** No response from API. */
	ErrNoResponseFromApi = 'ERR.NORESPONSEFROMAPI',

	/** Para InternalServerError. */
	ErrInternalServerError = 'ERR',

	/** Para validación sin ErrorCode específico. */
	ErrBadRequest = 'ERR.VALIDATION'
}
