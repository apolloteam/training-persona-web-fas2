import { Component, OnInit } from '@angular/core';
import { AppHelperService } from './app-helper.service';

/**
 * Componente para la vista app.
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    /**
     * Creates an instance of app component.
     * @param appHelperService Herramientras para app.
     */
    constructor(private appHelperService: AppHelperService) { }

    /**
     * Evento de inicialización del componente.
     */
    public ngOnInit(): void {

        /** Inicializa configuración de app. */
        this.appHelperService.initConfigApp();

    }

}
