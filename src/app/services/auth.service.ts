import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/interface/loginRequest';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { APIResponseModel } from '../model/interface/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginData: LoginRequest): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(environment.API_URL_USER + "Login", loginData);
  }
}
