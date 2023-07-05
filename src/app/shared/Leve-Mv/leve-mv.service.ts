import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeveMv } from './leve-mv.model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class LeveMvService {

  formData: LeveMv = new LeveMv();
  readonly baseUrl = 'https:localhost:7044/api/LeveMv';
  list : LeveMv[] = [];
  
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
    return this.http.get(this.baseUrl + '/listar').subscribe(res => this.list = res as LeveMv[]);
  }

  listarPorNome(nome: string) {
    return this.http.get(`${this.baseUrl}/listar-por-nome/${nome}`).subscribe(res => this.list = res as LeveMv[]);
  }

  pesquisarPoId(id: string){
    return this.http.get(`${this.baseUrl}/pesquisar/${id}`);
  }
}
