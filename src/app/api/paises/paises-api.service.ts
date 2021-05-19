import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config/api.config';
import { PagedList } from '../entities/paged-list';
import { Pais } from '../entities/pais';

/**
 * Administra las operaciones del módulo Pais Api.
 */
@Injectable()
export class PaisesApiService {

    /**
     * Creates an instance of auth api service.
     * @param httpClient Administra operaciones de peticiones HTTP.
     */
    constructor(private httpClient: HttpClient) { }

    /**
     * Obtiene una lista paginada de países.
     * @param pageIndex Número de página a solicitar.
     * @param pageSize Cantidad de items por página (De 1 a 100. default 10).
     * @param query Texto de búsqueda.
     * @returns  Lista de países.
     */
    public getPaises(pageIndex: number = 1, pageSize: number = 10, query?: string): Observable<PagedList<Pais>> {
        const url: string = this.getUrl('/paises');

        const params: HttpParams = new HttpParams({
            fromObject: {
                pageIndex: `${pageIndex}`,
                pageSize: `${pageSize}`,
                query
            }
        });

        return this.httpClient.get<PagedList<Pais>>(url, { params });
    }

    /** 
     * Inserta una país.
     * @param pais Datos de un país.
     * @returns Confirmación de la petición.
     */
    public post(pais: Pais): Observable<void> {
        const url: string = this.getUrl('/paises');
        return this.httpClient.post<void>(url, pais);
    }

    /** 
     * Edita un país.
     * @param pais Datos de un país.
     * @returns Confirmación de la petición.
     */
    public put(pais: Pais): Observable<void> {
        const url: string = this.getUrl('/paises');
        return this.httpClient.put<void>(url, pais);
    }

    /** 
     * Devuelve un pais.
     * @param iataCode Código IATA.
     * @returns Pais.
     */
    public getByIataCode(iataCode: string): Observable<Pais> {
        const url: string = this.getUrl(`/paises/${iataCode}`);
        return this.httpClient.get<Pais>(url);
    }

    /** 
     * Elimina una persona.
     * @param iataCode El identificador de la persona a eliminar.
     * @returns Confirmación de la petición.
     */
    public deleteById(iataCode: string): Observable<void> {
        const url: string = this.getUrl(`/paises/${iataCode}`);
        return this.httpClient.delete<void>(url);
    }

    /**
     * Genera la url del api con el protocolo, subdominio, baseUrl (tomado de configuración) y el path especificado.
     * @param path El path si se requiere (incluir "/", ejemplo "/paises/1").
     * @returns La url del Api.
     */
    private getUrl(path: string = ''): string {
        const ret: string = `${apiConfig.protocol}${apiConfig.paisesSubDomainName}.${apiConfig.baseUrl}${path}`;

        return ret;
    }
}
