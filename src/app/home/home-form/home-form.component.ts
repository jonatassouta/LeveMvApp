import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Leveme } from 'src/app/shared/leve-mv.model';
import { LeveMvService } from 'src/app/shared/leve-mv.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, tap, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnInit{

  constructor(public service: LeveMvService,
    private toastr: ToastrService) { }
  
    ngOnInit(): void {  
  }

  async onSubmit(form: NgForm) {
    if (this.service.formData.id == '00000000-0000-0000-0000-000000000000')
    {
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.postLeveMv().pipe(
      finalize(() => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Cadastrado com sucesso', 'Leve Mv');
      })
    ).subscribe(),
      catchError(this.handleError);
  
  }

  updateRecord(form: NgForm) {
    this.service.putLeveMv().pipe(
      finalize(() => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Atualizado com sucesso', 'Leve Mv');
      })
    ).subscribe(),
      catchError(this.handleError);
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Leveme();
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
    return throwError(errorMessage);
  };
  
}
