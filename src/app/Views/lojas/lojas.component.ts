import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
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
    private toastr: ToastrService) { }
    
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
      this.loja.deleteLeveMv(id).pipe(
        finalize(() => {
          this.loja.refreshList(),
          this.toastr.error("Apagado com sucesso", 'Loja')
        })
      ).subscribe();   
  }
  
  async listarPorNome(nome: string) {
    if (nome !== ""){
      await this.loja.listarPorNome(nome);    
    } else{
      this.loja.refreshList();
    }
  }
}
