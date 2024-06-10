import { Injectable } from '@angular/core';
import { RouterStateSerializer } from '@ngrx/router-store';

import { RouterReducerStateExtended } from './root.reducer';
import { RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RootRouterStateSerializerService implements RouterStateSerializer<RouterReducerStateExtended>{
  serialize(routerState: RouterStateSnapshot): RouterReducerStateExtended {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;

    const { params, data } = route;

    return { url, params, queryParams, data };
  }
}
