import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { modelMoeda } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class MoedaService {

  constructor( private http:HttpClient) { }

  getCotacao(inicial: string, final: string): Observable<modelMoeda> {
    return this.http.get<modelMoeda>(`https://economia.awesomeapi.com.br/json/${inicial}-${final}`)
    // return this.http.get<modelMoeda>(`${environment.apiurl}/json/${inicial}-${final}`)
  }

}
