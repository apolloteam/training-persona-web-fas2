import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of, Subject, throwError } from 'rxjs';
import { AppHelperService } from 'src/app/app-helper.service';
import { NavItem } from 'src/app/entities/nav-items';
import { AppStateModel } from 'src/app/store/app.state-model';
import * as routesConfig from '../config/routes.config';
import * as navItemsConfig from '../config/nav-items.config';
import * as authActions from '../auth/store/auth.actions';
import { HttpApiError } from 'src/app/api/entities/http-api-error';
import { AppCodes } from 'src/app/entities/app-codes';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { catchError, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Componente para la vista master page.
 */
@Component({
    selector: 'app-master-page',
    templateUrl: './master-page.component.html',
    styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent implements OnInit, OnDestroy {

    /** Referencia del menú de navegación. */
    @ViewChild(MatSidenav)
    public sidenav: MatSidenav;

    /** Verisón de la app. */
    @Select((state: AppStateModel) => state.shared.appVersion)
    public appVersion$: Observable<string>;

    /** Items del menú de navegación. */
    @Select((state: AppStateModel) => state.shared.navItems)
    public navItems$: Observable<NavItem[]>;

    /** Nombre del usuario logeado. */
    @Select((state: AppStateModel) => state.authPerFas.username)
    public username$: Observable<string>;

    /** True si la vista está cargando datos o ejecutando una operación. False de lo contrario. */
    public loading$: Observable<boolean>;

    /** Modo de visualización del sidenav. */
    public sidenavMode: 'over' | 'push' | 'side';

    /** True si el sidenav debe estar lockeado. False de lo contrario. */
    public lockedSidenav: boolean;

    /** Referencia para desuscribir observables del componente. */
    private destroy$: Subject<boolean> = new Subject<boolean>();

    /**
     * Creates an instance of login component.
     * @param activatedRoute Administra operaciones de la ruta activa.
     * @param router Administra operaciones de ruteo.
     * @param translateService Administra operaciones de i18n.
     * @param appHelperService Herramientas para app.
     * @param breakpointObserver Observador de cambios en la resolución de la vista.
     * @param store Administra operaciones para manejar el estado de la app.
     */
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public translateService: TranslateService,
        public appHelperService: AppHelperService,
        public breakpointObserver: BreakpointObserver,
        private store: Store
    ) { }

    /**
     * Evento de inicialización del componente.
     */
    public ngOnInit(): void {

        // Emite valores cuando aplica o dejan de aplicar los breakpoints observados.
        this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
            .pipe(takeUntil(this.destroy$))
            .subscribe((state: BreakpointState) => {
                this.sidenavMode = state.matches ? 'over' : 'side';
                this.lockedSidenav = !state.matches;
            });
    }

    /**
     * Evento de destrucción del componente.
     */
    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    /**
     * Evento de selección de un item del menú de navegación.
     * @param navItem Item de navegación.
     */
    public selectNavItem(navItem: NavItem): void {
        if (this.sidenavMode === 'over') {
            this.sidenav.toggle();
        }
        if (!!navItem && navItem.name === navItemsConfig.LOGOUT_KEY) {
            this.logout();
        } else if (navItem?.url && navItem.url !== this.activatedRoute.snapshot.fragment) {
            this.router.navigateByUrl(navItem.url);
        }
    }

    /**
     * Realiza el logout del usuario.
     */
    private logout(): void {
        this.store.dispatch(new authActions.Logout())
            .pipe(
                catchError((err: unknown) => this.handleLogoutError(err))
            )
            .subscribe(() => {
                this.router.navigateByUrl(`/${routesConfig.AUTH}/${routesConfig.LOGIN}`);
            });
    }

    /**
     * Maneja errores de logout.
     * @param apiError Error durante el logout.
     * @returns Confirmación del manejo del error. 
     */
    private handleLogoutError(apiError: HttpApiError): Observable<void> {
        switch (apiError?.error?.errorCode) {
            case AppCodes.UserCancel:
                break;
            default:
                return throwError({ ...apiError, handle: true });
        }
        return of();
    }
}
