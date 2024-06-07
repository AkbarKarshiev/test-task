import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AuthResponse, AuthSubmitBody } from '../common/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private http: HttpClient) { }

  public login(data: AuthSubmitBody): Observable<AuthResponse> {
    return this.http.post<AuthResponse>( 'api/auth/token/login/', data);
  }
}
