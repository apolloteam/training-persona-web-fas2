import { Sort } from '@angular/material/sort';
import { Pais } from 'src/app/api/entities/pais';

const CONTEXT: string = '[PAISES]';

/** Resetea el listado de países. */
export class ResetList {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} reset list`;
}

/** Setea valores de paginación. */
export class SetPagination {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} set pagination`;

    /**
     * Creates an instance of set pagination.
     * @param pageIndex Número de página.
     * @param pageSize Cantidad de resultados por página.
     */
    constructor(public pageIndex: number, public pageSize: number) { }
}

/** Setea el orden del listado. */
export class SetSort {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} set sort`;

    /**
     * Creates an instance of set sort.
     * @param sort Orden de listado.
     */
    constructor(public sort: Sort) { }
}

/** Obtiene una lista de países. */
export class GetList {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} get list`;
}

/** Obtiene todos los países. */
export class GetAll {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} get all`;
}

/** Crea una nuevo país. */
export class Create {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} create`;

    /**
     * Creates an instance of create.
     * @param pais País a crear.
     */
    constructor(public pais: Pais) { }
}

/** Edita una nueva país. */
export class Edit {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} edit`;

    /**
     * Creates an instance of edit.
     * @param pais Pais.
     */
    constructor(public pais: Pais) { }
}

/** Elimna un país. */
export class DeleteById {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} delete by id`;

    /**
     * Creates an instance of delete by id.
     * @param idPais Id del país.
     */
    constructor(public idPais: string) { }
}

/** Obtiene un país para poder editarlo. */
export class GetPaisToEdit {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} get pais to edit`;

    /**
     * Creates an instance of get pais to edit.
     * @param idPais Id del país.
     */
    constructor(public idPais: string) { }
}

/** Resetea la persona a editar. */
export class ResetPaisToEdit {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} Reset pais to edit`;
}
