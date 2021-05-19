import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { NAV_ITEMS } from 'src/app/config/nav-items.config';
import { SHARED_STATE_NAME } from '../../store/app.state-model';
import * as actions from './shared.actions';
import { SharedStateModel } from './shared.state-model';

/**
 * Implementa las acciones del módulo Shared.
 */
@State<SharedStateModel>({
    name: SHARED_STATE_NAME,
    defaults: {
        navItems: NAV_ITEMS,
        appVersion: '1.0.0'
    }
})
@Injectable()
export class SharedState {

    /**
     * Define los items de navegación.
     * @param { patchState } stateContext Estado de la app.
     */
    @Action(actions.SetNavItems)
    public setNavItems({ patchState }: StateContext<SharedStateModel>, { navItems }: actions.SetNavItems): void {
        patchState({ navItems });
    }
}
