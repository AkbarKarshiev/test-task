import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/api/service/api.service';
import { ListItem, ListItemModel, ListResponse } from '../common/list.interface';

@Injectable()
export class ListApiService {
  constructor(private readonly apiService: ApiService) { }

  public loadList(): Observable<ListResponse> {
    return this.apiService.get<ListResponse>('api/todo/?offset=0&limit=1000');
  }

  public loadOneListItem(id: string): Observable<ListItem> {
    return this.apiService.get<ListItem>(`api/todo/${id}/`);
  }

  public createListItem(data: ListItemModel): Observable<ListItem> {
    return this.apiService.post<ListItem>('api/todo/', data);
  }

  public updateListItem(itemId: string, data: ListItemModel): Observable<ListItem> {
    return this.apiService.put<ListItem>(`api/todo/${itemId}/`, data);
  }

  public deleteListItem(itemId: string): Observable<unknown> {
    return this.apiService.delete<unknown>(`api/todo/${itemId}/`);
  }
}
