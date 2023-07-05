import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { Produto } from 'src/app/shared/Produto/produto.model';
import { ProdutoService } from 'src/app/shared/Produto/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit{

  public idProduto: string = '';
  public nomeProduto: string = '';
  public paginaAtual = 1;
  
  constructor(public produto: ProdutoService,
    private toastr: ToastrService) { }
    
    ngOnInit(): void {
      this.produto.refreshList();
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
          this.produto.refreshList(),
          this.toastr.error("Apagado com sucesso", 'Produto')
        })
      ).subscribe();   
  }
  
  listarPorNome(nome: string) {
    if (nome !== ""){
      this.produto.listarPorNome(nome);    
    } else{
      this.produto.refreshList();
    }
  }

  getLeveMv(id: string): Produto{
   return this.produto.list.find(x => x.id == id)!;
  }

  resetForm() {
    this.produto.formData = new Produto();
  }
}
