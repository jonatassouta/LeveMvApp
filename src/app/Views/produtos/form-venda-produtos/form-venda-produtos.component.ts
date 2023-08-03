import { Produto } from './../../../shared/Produto/produto.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, throwError } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';
import { ProdutoService } from 'src/app/shared/Produto/produto.service';

@Component({
  selector: 'app-form-venda-produtos',
  templateUrl: './form-venda-produtos.component.html',
  styleUrls: ['./form-venda-produtos.component.css']
})
export class FormVendaProdutosComponent {

  constructor(public produto: ProdutoService,
    private toastr: ToastrService, private login: UserService) { }

  public quantidadeVenda: number = 0;
  userLogger = this.login.getUser();

  vendaProduto(id: string, qtd: number, form: NgForm) {

    this.produto.putVendaProduto(id, qtd).subscribe((data: any) => {
      if (data) {
        this.resetForm(form);
        this.produto.listarPorLoja(this.userLogger.user.id, "1");
        if(data === "Estoque Atualizado!"){
          this.toastr.success(data, 'Produto');
        }else {
          this.toastr.error(data, 'Produto');
        }
      }
    }, error => {
      console.log(error.error);
      this.toastr.error("Erro Interno", 'ERRO');
    })

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
