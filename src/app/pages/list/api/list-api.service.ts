import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/api/service/api.service';
import { EnvironmentService } from '../../../core/environments/service/environment.service';
import { ListItem, ListResponse } from '../common/list.interface';

@Injectable()
export class ListApiService {
    constructor(private readonly apiService: ApiService, private readonly environmentService: EnvironmentService) { }

    public loadList(): Observable<ListResponse> {
        return this.apiService.get<ListResponse>(this.getListApiRoute());
    }

    public loadOneListItem(id: string): Observable<ListItem> {
        return this.apiService.get<ListItem>(this.getListItemApiRoute(id));
    }

    private getListApiRoute(): string {
        return this.environmentService.environments.api + '/todo/';
    }

    private getListItemApiRoute(id: string): string {
        return this.environmentService.environments.api + `/todo/${id}`;
    }
}
