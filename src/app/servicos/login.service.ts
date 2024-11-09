import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';
import { SalutarToken } from '../model/SalutarToken';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {}

  public efetuarLogin(usuario: Usuario):Observable<SalutarToken> {
    return this.http.post<SalutarToken>("http://localhost:8080/login",usuario);
  }
}
