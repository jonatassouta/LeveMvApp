import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LojaService } from 'src/app/shared/Lojas/lojas.service';
import { Produto } from 'src/app/shared/Produto/produto.model';
import { ProdutoService } from 'src/app/shared/Produto/produto.service';
import { UserService } from 'src/app/shared/Users/user.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  public idProduto: string = '';
  public numeroFiltro: string = '1';
  public nomeProduto: string = '';
  public paginaAtual = 1;

  constructor(public produto: ProdutoService,
    private toastr: ToastrService, public loja: LojaService, public user: UserService) { }

  ngOnInit(): void {
    this.pesquisarPorLoja(this.user.userLogged.user.id);
    this.loja.refreshList();
  }

  populateForm(selectedRecord: Produto) {
    this.produto.formData = Object.assign({}, selectedRecord);
  }

  atribuirIdNome(id: string, nome: string) {
    this.idProduto = id;
    this.nomeProduto = nome;
  }

  onDelete(id: string) {
    this.produto.deleteProduto(id).pipe(
      finalize(() => {
        this.pesquisarPorLoja(this.user.userLogged.user.id),
          this.toastr.error("Apagado com sucesso", 'Produto')
      })
    ).subscribe();
  }

  listarPorNome(nome: string) {
    if (nome !== "") {
      this.produto.listarPorNome(nome);
    } else {
      this.pesquisarPorLoja(this.user.userLogged.user.id);
    }
  }

  getLeveMv(id: string): Produto {
    return this.produto.list.find(x => x.id == id)!;
  }

  resetForm() {
    this.produto.formData = new Produto();
  }

  pesquisarPorLoja(id: string) {
    return this.produto.listarPorLoja(id, this.numeroFiltro);
  }
}
