import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Leveme } from './leve-mv.model';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class LeveMvService {

  formData: Leveme = new Leveme();
  readonly baseUrl = 'https:localhost:7044/api/LeveMe';
  list : Leveme[] = [];
  
  constructor(private http: HttpClient) { }
  
  postLeveMv() {
    this.formData.id = Guid.create().toString();
    return this.http.post(this.baseUrl + '/cadastrar', this.formData);
  }

  putLeveMv() {
    return this.http.put(`${this.baseUrl}/atualizar`, this.formData);
  }

  deleteLeveMv(id: string) {
    return this.http.delete(`${this.baseUrl}/deletar/${id}`);
  }

  refreshList() {
    return this.http.get(this.baseUrl + '/listar').subscribe(res => this.list = res as Leveme[]);
  }

  listarPorNome(nome: string) {
    return this.http.get(`${this.baseUrl}/listar-por-nome/${nome}`).subscribe(res => this.list = res as Leveme[]);
  }

  pesquisarPoId(id: string){
    this.http.get(`${this.baseUrl}/pesquisar/${id}`);
  }
}
