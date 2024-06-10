import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AuthResponse, AuthSubmitBody } from '../common/auth.interface';
import { EnvironmentService } from '../../../core/environments/service/environment.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private http: HttpClient, private readonly environmentService: EnvironmentService) { }

  public login(data: AuthSubmitBody): Observable<AuthResponse> {
    return this.http.post<AuthResponse>( `${this.apiRoute}/auth/token/login/`, data);
  }

  private get apiRoute(): string {
    console.log(this.environmentService.environments.production);
    if (this.environmentService.environments.production) {
      return this.environmentService.environments.api;
    } else {
      return 'api';
    }
  }
}
