import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ListApiModule } from '../api/list-api.module';

import * as fromList from './list.reducer';
import { ListFacade } from './list.facade';
import { ListEffects } from './list.effects';

@NgModule({
    imports: [
        ListApiModule,
        StoreModule.forFeature(fromList.LIST_FEATURE_KEY, fromList.listReducer),
        EffectsModule.forFeature([ListEffects]),
    ],
    providers: [ListFacade],
})
export class ListStateModule {}
