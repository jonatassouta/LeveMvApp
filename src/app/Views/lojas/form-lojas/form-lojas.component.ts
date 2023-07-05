import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, throwError } from 'rxjs';
import { LeveMvService } from 'src/app/shared/Leve-Mv/leve-mv.service';
import { Loja } from 'src/app/shared/Lojas/lojas.model';
import { LojaService } from 'src/app/shared/Lojas/lojas.service';

@Component({
  selector: 'app-form-lojas',
  templateUrl: './form-lojas.component.html',
  styleUrls: ['./form-lojas.component.css']
})
export class FormLojasComponent implements OnInit{

  constructor(public loja: LojaService,
    private toastr: ToastrService, public leveMv: LeveMvService) { }
  
    ngOnInit(): void {
      this.leveMv.refreshList();  
  }

  onSubmit(form: NgForm) {
    if (this.loja.formData.id == '00000000-0000-0000-0000-000000000000')
    {
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.loja.formData.dataCadastro = new Date();
    this.loja.postLoja().pipe(
      finalize(() => {
        this.resetForm(form);
        this.loja.refreshList();
        this.toastr.success('Cadastrado com sucesso', 'Loja');
      })
      ,catchError(this.handleError)
      ).subscribe();
  }

  updateRecord(form: NgForm) {
    this.loja.putLoja().pipe(
      finalize(() => {
        this.resetForm(form);
        this.loja.refreshList();
        this.toastr.success('Atualizado com sucesso', 'Loja');
      })
      ,catchError(this.handleError)
    ).subscribe();   
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.loja.formData = new Loja();
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