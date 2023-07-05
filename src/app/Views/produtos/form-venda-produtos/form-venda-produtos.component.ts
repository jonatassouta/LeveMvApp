import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, throwError } from 'rxjs';
import { Produto } from 'src/app/shared/Produto/produto.model';
import { ProdutoService } from 'src/app/shared/Produto/produto.service';

@Component({
  selector: 'app-form-venda-produtos',
  templateUrl: './form-venda-produtos.component.html',
  styleUrls: ['./form-venda-produtos.component.css']
})
export class FormVendaProdutosComponent {

  constructor(public produto: ProdutoService,
    private toastr: ToastrService) { }

public quantidadeVenda: number = 0;

  vendaProduto(id: string, qtd: number, form: NgForm) {
    this.produto.putVendaProduto(id, qtd).pipe(
      finalize(() => {
        this.resetForm(form);
        this.produto.refreshList();
        this.toastr.success('Estoque Atualizado', 'Produto');
      })
      , catchError(this.handleError)
    ).subscribe();
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.produto.formData = new Produto();
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  };

}
