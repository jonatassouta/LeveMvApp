import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LeveMv } from 'src/app/shared/Leve-Mv/leve-mv.model';
import { LeveMvService } from 'src/app/shared/Leve-Mv/leve-mv.service';
import { Loja } from 'src/app/shared/Lojas/lojas.model';
import { LojaService } from 'src/app/shared/Lojas/lojas.service';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.css']
})
export class LojasComponent  implements OnInit{

  public idLoja: string = '';
  public nomeLoja: string = '';
  public paginaAtual = 1;
  
  constructor(public loja: LojaService,
    private toastr: ToastrService, public leve: LeveMvService) { }
    
    ngOnInit(): void {
      this.loja.refreshList();
    }
    
  populateForm(selectedRecord: Loja) {
    this.loja.formData = Object.assign({}, selectedRecord);
  }

  atribuirIdNome(id: string, nome: string) {
    this.idLoja = id;
    this.nomeLoja = nome;
  }

    onDelete(id: string) {
      this.loja.deleteLoja(id).pipe(
        finalize(() => {
          this.loja.refreshList(),
          this.toastr.error("Apagado com sucesso", 'Loja')
        })
      ).subscribe();   
  }
  
  listarPorNome(nome: string) {
    if (nome !== ""){
      this.loja.listarPorNome(nome);    
    } else{
      this.loja.refreshList();
    }
  }

  getLeveMv(id: string): LeveMv{
   return this.leve.list.find(x => x.id == id)!;
  }

  resetForm() {
    this.loja.formData = new Loja();
  }
}
