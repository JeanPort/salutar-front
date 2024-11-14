import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DadosCEP } from '../model/DadosCEP';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  public buscarCep(dados: string) : Observable<DadosCEP>{
    return this.http.get<DadosCEP>("https://viacep.com.br/ws/"+dados+"/json");
  }
}