import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiConfig } from 'src/app/config/api.config';

/**
 * Administra las operaciones del módulo Auth Api.
 */
@Injectable()
export class AuthApiService {

    /**
     * Creates an instance of AuthApiService.
     * @param httpClient Administra operaciones de peticiones HTTP.
     */
    constructor(private httpClient: HttpClient) { }

    /**
     * Request an OpenId Authentication.
     * @param username User name.
     * @param password The user password.
     * @returns Access token.
     */
    public login(username: string, password: string): Observable<string> {
        const url: string = this.getUrl('/connect/token');
        const authFormData: FormData = new FormData();

        authFormData.append('username', username);
        authFormData.append('password', password);

        return this.httpClient.post(url, authFormData, { responseType: 'text' })
            .pipe(
                catchError((error) => throwError({ ...error, error: JSON.parse(error.error) }))
            );
    }

    /**
     * Genera la url del api con el protocolo, subdominio, baseUrl (tomado de configuración) y el path especificado.
     * @param path El path si se requiere (incluir "/", ejemplo "/paises/1").
     * @returns La url del Api.
     */
    private getUrl(path: string = ''): string {
        const ret: string = `${apiConfig.protocol}${apiConfig.authSubDomainName}.${apiConfig.baseUrl}${path}`;

        return ret;
    }
}
