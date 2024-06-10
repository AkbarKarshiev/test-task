import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { tap } from 'rxjs';

import { RouterReducerStateExtended } from '../../store/root/root.reducer';
import { MetaConfig } from '../common/meta.interface';
import { MetaService } from '../service/meta.service';


type NavigationAction = RouterNavigatedAction<RouterReducerStateExtended<{ meta?: Partial<MetaConfig>; }>>;

@Injectable()
export class MetaEffects {
  routerNavigated$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ROUTER_NAVIGATED),
      tap((action: NavigationAction) => {
        const { meta } = action.payload.routerState?.data ?? {};
        this.metaService.update(
          {
            url: action.payload.routerState.url,
            ...meta
          }
        );
      }),
    );
  }, { dispatch: false });

  constructor(private readonly action$: Actions, private readonly metaService: MetaService) {
  }
}
