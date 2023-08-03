import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Loja } from './lojas.model';
import { UserService } from '../../auth/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  formData: Loja = new Loja();
  readonly baseUrl = 'https:localhost:7044/api/Cliente';
  list : Loja[] = [];
  
  constructor(private http: HttpClient, private user: UserService) {}
  
  postLoja() {
    this.formData.id = Guid.create().toString();
    return this.http.post(this.baseUrl + '/cadastrar', this.formData);
  }

  putLoja() {
    return this.http.put(`${this.baseUrl}/atualizar`, this.formData);
  }

  deleteLoja(id: string) {
    return this.http.delete(`${this.baseUrl}/deletar/${id}`);
  }

  refreshList() {
    return this.http.get(this.baseUrl + '/listar').subscribe(res => this.list = res as Loja[]);
  }

  listarPorNome(nome: string) {
    return this.http.get(`${this.baseUrl}/listar-por-nome/${nome}`).subscribe(res => this.list = res as Loja[]);
  }

  pesquisarPoId(id: string){
    this.http.get(`${this.baseUrl}/pesquisar/${id}`);
  }
}
