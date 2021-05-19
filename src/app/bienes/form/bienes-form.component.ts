import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Bien } from 'src/app/api/entities/bien';

/**
 * Componente para la vista bienes form.
 */
@Component({
    selector: 'app-bienes-form',
    templateUrl: './bienes-form.component.html',
    styleUrls: ['./bienes-form.component.scss']
})
export class BienesFormComponent implements OnInit {

    /** Referencia del formulario. */
    public formBien: FormGroup;

    /** True si la app se encuentra cargando información. False de lo contrario. */
    public loading: boolean = false;

    /** Tipos de bienes. */
    public bienesTypes: string[] = [
        'Mueble',
        'Inmueble',
        'De uso',
        'Otro'
    ];

    /**
     * Creates an instance of change itinerary component.
     * @param translateService Administra operaciones de i18n.
     * @param formBuilder Administra operaciones para implementar formularios reactivos.
     * @param dialogRef Servicio de dialog (angular material).
     * @param model Modelo del cambio de itinerario.
     */
    constructor(
        public translateService: TranslateService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<void, Bien>) { }

    /**
     * Evento de inicialización del componente.
     */
    public ngOnInit(): void {
        this.buildForm();
    }

    /**
     * Cierra el modal.
     */
    public closeModal(): void {
        this.dialogRef.close();
    }

    /**
     * Envía la información del formulario por evento y cierra el dialog.
     */
    public submit(): void {
        this.dialogRef.close(this.formBien.value);
    }

    /**
     * Configura los campos del formulario.
     */
    private buildForm(): void {
        this.formBien = this.formBuilder.group({
            tipo: [null, Validators.required],
            descripcion: [null, Validators.required],
            valor: [null, Validators.required]
        });
    }

}
