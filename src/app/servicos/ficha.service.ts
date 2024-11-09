import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaPaciente } from '../model/FichaPaciente';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public buscarFichas(nome: string): Observable<FichaPaciente[]> {

    let header = this.tokenService.getTokenHeader();
    return this.http.get<FichaPaciente[]>(environment.apiURL+"/fichas/busca?nome="+nome, {headers: header});
  }
}