import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ListActions from './list.actions';
import * as ListSelectors from './list.selector';
import { filter, switchMap } from 'rxjs';

@Injectable()
export class ListFacade {
    loaded$ = this.store.select(ListSelectors.selectListLoaded);

    list$ = this.store.select(ListSelectors.selectList);

    listEntities$ = this.store.select(ListSelectors.selectListEntities);

    listItemById$ = (id: string) => this.store.select(ListSelectors.selectListItem(id));

    listItemByIdLoaded$ = (id: string) => this.list$.pipe(
        filter((list) => list.length > 0),
        switchMap(() => this.store.select(ListSelectors.selectListItem(id))
    ));

    constructor(private readonly store: Store) {}

    public loadItems(): void {
        this.store.dispatch(ListActions.load());
    }
}
