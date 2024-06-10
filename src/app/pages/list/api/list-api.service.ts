import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/api/service/api.service';
import { ListItem, ListItemModel, ListResponse } from '../common/list.interface';
import { EnvironmentService } from '../../../core/environments/service/environment.service';

@Injectable()
export class ListApiService {
  constructor(private readonly apiService: ApiService, private readonly environmentService: EnvironmentService) { }

  public loadList(): Observable<ListResponse> {
    return this.apiService.get<ListResponse>(`${this.apiRoute}/todo/?offset=0&limit=10000`);
  }

  public loadOneListItem(id: string): Observable<ListItem> {
    return this.apiService.get<ListItem>(`${this.apiRoute}/todo/${id}/`);
  }

  public createListItem(data: ListItemModel): Observable<ListItem> {
    return this.apiService.post<ListItem>(`${this.apiRoute}/todo/`, data);
  }

  public updateListItem(itemId: string, data: ListItemModel): Observable<ListItem> {
    return this.apiService.put<ListItem>(`${this.apiRoute}/todo/${itemId}/`, data);
  }

  public deleteListItem(itemId: string): Observable<unknown> {
    return this.apiService.delete<unknown>(`${this.apiRoute}/todo/${itemId}/`);
  }

  private get apiRoute(): string {
    if (this.environmentService.environments.production) {
      return this.environmentService.environments.api;
    } else {
      return 'api';
    }
  }
}
