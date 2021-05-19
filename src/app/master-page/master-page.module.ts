import { NgModule } from '@angular/core';

import { MasterPageRoutingModule } from './master-page-routing.module';
import { MasterPageComponent } from './master-page.component';
import { SharedModule } from '../shared/shared.module';

/**
 * Módulo para master page.
 */
@NgModule({
    declarations: [MasterPageComponent],
    imports: [
        SharedModule,
        MasterPageRoutingModule
    ]
})
export class MasterPageModule { }
