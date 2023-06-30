import { Component, OnInit } from '@angular/core';
import { LeveMvService } from '../shared/leve-mv.service';
import { ToastrService } from 'ngx-toastr';
import { Leveme } from '../shared/leve-mv.model';
import { finalize, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public idLeveMv: string = '';
  public nomeLeveMv: string = '';
  public paginaAtual = 1;
  
  constructor(public service: LeveMvService,
    private toastr: ToastrService) { }
    
    ngOnInit(): void {
      this.service.refreshList();
    }
    
  populateForm(selectedRecord: Leveme) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  atribuirIdNome(id: string, nome: string) {
    this.idLeveMv = id;
    this.nomeLeveMv = nome;
  }

    onDelete(id: string) {
      this.service.deleteLeveMv(id).pipe(
        finalize(() => {
          this.service.refreshList(),
          this.toastr.error("Apagado com sucesso", 'Leve Mv')
        })
      ).subscribe();   
  }
  

  async listarPorNome(nome: string) {
    if (nome !== ""){
      await this.service.listarPorNome(nome);    
    } else{
      this.service.refreshList();
    }
  }
}
