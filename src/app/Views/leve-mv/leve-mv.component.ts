import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LeveMv } from 'src/app/shared/Leve-Mv/leve-mv.model';
import { LeveMvService } from 'src/app/shared/Leve-Mv/leve-mv.service';

@Component({
  selector: 'app-leve-mv',
  templateUrl: './leve-mv.component.html',
  styleUrls: ['./leve-mv.component.css']
})
export class LeveMvComponent implements OnInit{

  public idLeveMv: string = '';
  public nomeLeveMv: string = '';
  public paginaAtual = 1;
  
  constructor(public service: LeveMvService,
    private toastr: ToastrService) { }
    
    ngOnInit(): void {
      this.service.refreshList();
    }
    
  populateForm(selectedRecord: LeveMv) {
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
