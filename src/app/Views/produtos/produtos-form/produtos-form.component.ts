import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, throwError } from 'rxjs';
import { LojaService } from 'src/app/shared/Lojas/lojas.service';
import { Produto } from 'src/app/shared/Produto/produto.model';
import { ProdutoService } from 'src/app/shared/Produto/produto.service';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.css']
})
export class ProdutosFormComponent implements OnInit {

  public numeroFiltro: string = '1';
  constructor(public produto: ProdutoService,
    private toastr: ToastrService, public loja: LojaService, private user: UserService) { }

  ngOnInit(): void {
    this.loja.refreshList();
  }

  onSubmit(form: NgForm) {
    if (this.produto.formData.id == '00000000-0000-0000-0000-000000000000') {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.produto.postProduto().pipe(
      finalize(() => {
        this.resetForm(form);
        this.produto.refreshList();
        this.toastr.success('Cadastrado com sucesso', 'Produto');
      })
      , catchError(this.handleError)
    ).subscribe();
  }

  updateRecord(form: NgForm) {
    
    this.produto.putProduto().pipe(
      finalize(() => {
      this.resetForm(form);
      this.pesquisarPorLoja(this.user.userLogged.user.id),
      this.toastr.success('Atualizado com sucesso', 'Produto');
    })).subscribe(),
    catchError(this.handleError);
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

  pesquisarPorLoja(id: string) {
    return this.produto.listarPorLoja(id, this.numeroFiltro);
  }
}
