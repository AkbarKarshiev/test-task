import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ListActions from './list.actions';
import * as ListSelectors from './list.selector';
import { filter, switchMap } from 'rxjs';
import { ListItemModel } from '../common/list.interface';
import { deleteEditItem } from './list.actions';

@Injectable()
export class ListFacade {
    loaded$ = this.store.select(ListSelectors.selectListLoaded);

    loading$ = this.store.select(ListSelectors.selectListLoading);

    list$ = this.store.select(ListSelectors.selectList);

    editItem$ = this.store.select(ListSelectors.selectEditItem);

    editItemLoading$ = this.store.select(ListSelectors.selectEditItemLoading);

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

    public loadOneItem(id: string): void {
        this.store.dispatch(ListActions.loadOneItem({ id }));
    }

    public createListItem(data: ListItemModel): void {
        this.store.dispatch(ListActions.createOneItem({ item: data }));
    }

    public updateListItem(itemId: string, data: ListItemModel): void {
        this.store.dispatch(ListActions.updateOneItem({ id: itemId, item: data }));
    }

    public toggleListItemStatus(itemId: string, data: ListItemModel): void {
        const dataToUpdate = { ...data, completed: !data.completed };
        this.store.dispatch(ListActions.updateOneItem({ id: itemId, item: dataToUpdate }));
    }

    public deleteEditItem(): void {
        this.store.dispatch(ListActions.deleteEditItem());
    }

    public deleteItem(id: string): void {
        this.store.dispatch(ListActions.deleteOneItem({ id }));
    }
}
