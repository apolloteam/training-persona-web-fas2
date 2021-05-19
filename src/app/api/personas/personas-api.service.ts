import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config/api.config';
import { PagedList } from '../entities/paged-list';
import { Persona } from '../entities/persona';

/**
 * Administra las operaciones del módulo Persona Api.
 */
@Injectable()
export class PersonasApiService {

    /**
     * Creates an instance of auth api service.
     * @param httpClient Administra operaciones de peticiones HTTP.
     */
    constructor(private httpClient: HttpClient) { }

    /**
     * Obtiene una lista paginada de personas.
     * @param pageIndex Número de página a solicitar.
     * @param pageSize Cantidad de items por página (De 1 a 100. default 10).
     * @param query Texto de búsqueda.
     * @returns  Lista de personas.
     */
    public getPersonas(pageIndex: number = 1, pageSize: number = 10, query?: string): Observable<PagedList<Persona>> {
        const url: string = this.getUrl('/personas');

        const params: HttpParams = new HttpParams({
            fromObject: {
                pageIndex: `${pageIndex}`,
                pageSize: `${pageSize}`,
                query
            }
        });

        return this.httpClient.get<PagedList<Persona>>(url, { params });
    }

    /** 
     * Inserta una persona.
     * @param persona Los datos a ingresar.
     * @returns Confirmación de la petición.
     */
    public post(persona: Persona): Observable<void> {
        const url: string = this.getUrl('/personas');
        return this.httpClient.post<void>(url, persona);
    }

    /** 
     * Actualiza la persona especificada.
     * @param persona La persona con los datos a actualizar.
     * @returns Confirmación de la petición.
     */
    public put(persona: Persona): Observable<void> {
        const url: string = this.getUrl('/personas');
        return this.httpClient.put<void>(url, persona);
    }

    /** 
     * Elimina una persona.
     * @param id El identificador de la persona a eliminar.
     * @returns Confirmación de la petición.
     */
    public deleteById(id: number): Observable<void> {
        const url: string = this.getUrl(`/personas/${id}`);
        return this.httpClient.delete<void>(url);
    }

    /** 
     * Obtiene una persona por su Id.
     * @param id El identificador de la persona a buscar.
     * @returns Una persona.
     */
    public getById(id: number): Observable<Persona> {
        const url: string = this.getUrl(`/personas/${id}`);
        return this.httpClient.get<Persona>(url);
    }

    /** 
     * Obtiene una persona por su correo electrónico.
     * @param email El correo electrónico de la persona a buscar.
     * @returns Persona.
     */
    public getByEmail(email: string): Observable<Persona> {
        const url: string = this.getUrl(`/personas/${email}`);
        return this.httpClient.get<Persona>(url);
    }

    /**
     * Genera la url del api con el protocolo, subdominio, baseUrl (tomado de configuración) y el path especificado.
     * @param path El path si se requiere (incluir "/", ejemplo "/personas/1").
     * @returns La url del Api.
     */
    private getUrl(path: string = ''): string {
        const ret: string = `${apiConfig.protocol}${apiConfig.personasSubDomainName}.${apiConfig.baseUrl}${path}`;

        return ret;
    }
}
