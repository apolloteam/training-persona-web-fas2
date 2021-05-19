/**
 * A request for an AccessToken in order to be authenticated in our system.
 */
export interface AccessTokenRequest {

    /** ApiKey provided by DotTransfers to identify your acount. */
    apiKey: string;

    /** User name (if nedd an AccessToken from user credentials). */
    userName: string;

    /** User password (if nedd an AccessToken from user credentials). */
    password: string;
}
