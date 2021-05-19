import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from './error-handler.service';

/**
 * Módulo para error hanlder.
 */
@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        ErrorHandlerService,
        {
            provide: ErrorHandler,
            useClass: ErrorHandlerService
        }
    ]
})
export class ErrorHandlerModule { }
