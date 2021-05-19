import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { PaginatorI18n } from './paginator-i18n.config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const angularMaterialModules: any = [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDividerModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule
];

/**
 * Módulo para angular material.
 */
@NgModule({
    declarations: [],
    imports: [...angularMaterialModules],
    exports: [...angularMaterialModules],
    providers: [
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'es-AR'
        },
        {
            provide: MatPaginatorIntl,
            useClass: PaginatorI18n
        },
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'ARS'
        },
        {
            provide: LOCALE_ID,
            useValue: 'es-AR'
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                floatLabel: 'always',
                appearance: 'outline'
            }
        }
    ]
})
export class AngularMaterialModule { }
