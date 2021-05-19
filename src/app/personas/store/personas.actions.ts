import { Persona } from 'src/app/api/entities/persona';

const CONTEXT: string = '[PERSONAS]';

/** Resetea el listado de personas. */
export class ResetList {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} reset list`;
}

/** Setea valores de paginación. */
export class SetPagination {
    public static readonly type = `${CONTEXT} set pagination`;

    /**
     * Creates an instance of set pagination.
     * @param pageIndex Número de página.
     * @param pageSize Cantidad de resultados por página.
     */
    constructor(public pageIndex: number, public pageSize: number) { }
}

/** Obtiene una lista de personas. */
export class GetList {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} get`;
}

/** Crea una nueva persona. */
export class Create {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} create`;

    /**
     * Creates an instance of create.
     * @param persona Datos de una persona.
     */
    constructor(public persona: Persona) { }
}

/** Edita una persona. */
export class Edit {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} edit`;

    /**
     * Creates an instance of edit.
     * @param persona Datos de una persona.
     */
    constructor(public persona: Persona) { }
}

/** Elimna una persona. */
export class DeleteById {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} delete by id`;

    /**
     * Creates an instance of delete by id.
     * @param idPersona Id de la persona.
     */
    constructor(public idPersona: number) { }
}

/** Obtiene una persona para poder editarla. */
export class GetPersonaToEdit {
    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} Get persona to edit`;

    /**
     * Creates an instance of get persona to edit.
     * @param idPersona Id de la persona.
     */
    constructor(public idPersona: number) { }
}

/** Resetea el país a editar. */
export class ResetPersonaToEdit {

    /* Identificador de la acción. */
    public static readonly type = `${CONTEXT} Reset persona to edit`;
}
