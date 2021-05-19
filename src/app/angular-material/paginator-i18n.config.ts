import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

/**
 * Configuración de textos para el paginador.
 */
@Injectable()
export class PaginatorI18n extends MatPaginatorIntl {

    /**
     * Creates an instance of paginator i18n.
     */
    constructor(private translateService: TranslateService) {
        super();
        this.previousPageLabel = this.translateService.instant('PAGINATOR.PREV');
        this.nextPageLabel = this.translateService.instant('PAGINATOR.NEXT');
        this.firstPageLabel = this.translateService.instant('PAGINATOR.FIRST_PAGE');
        this.lastPageLabel = this.translateService.instant('PAGINATOR.LAST_PAGE');
        this.itemsPerPageLabel = this.translateService.instant('PAGINATOR.PAGE_SIZE');
        this.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const pageIndex: number = page + 1;
            const resultPage: number = pageIndex * pageSize;
            // eslint-disable-next-line max-len
            return `${(page * pageSize) + 1} - ${resultPage > length ? length : resultPage} ${this.translateService.instant('PAGINATOR.OF')} ${length}`;
        };
    }
}
