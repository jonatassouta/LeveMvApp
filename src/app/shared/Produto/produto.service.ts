import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Produto } from './produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  formData: Produto = new Produto();
  readonly baseUrl = 'https:localhost:7044/api/Produto';
  list : Produto[] = [];
  
  constructor(private http: HttpClient) { }
  
  postProduto() {
    this.formData.id = Guid.create().toString();
    return this.http.post(this.baseUrl + '/cadastrar', this.formData);
  }

  putProduto() {
    return this.http.put(`${this.baseUrl}/atualizar`, this.formData);
  }

  deleteProduto(id: string) {
    return this.http.delete(`${this.baseUrl}/deletar/${id}`);
  }

  refreshList() {
    return this.http.get(this.baseUrl + '/listar').subscribe(res => this.list = res as Produto[]);
  }

  listarPorNome(nome: string) {
    return this.http.get(`${this.baseUrl}/listar-por-nome/${nome}`).subscribe(res => this.list = res as Produto[]);
  }

  listarPorLoja(id: string, number: string) {
    return this.http.get(`${this.baseUrl}/listar-cliente/${id},${number}`).subscribe(res => this.list = res as Produto[]);
  }

  filtroEstoque(number: string) {
    return this.http.get(`${this.baseUrl}/filtro-por-estoque/${number}`).subscribe(res => this.list = res as Produto[]);
  }

  pesquisarPoId(id: string){
    this.http.get(`${this.baseUrl}/pesquisar/${id}`);
  }

  putVendaProduto(id: string, qtd: number) {
    return this.http.put(`${this.baseUrl}/vender/${id},${qtd}`, this.formData);
  }
}
