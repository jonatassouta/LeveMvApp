import { Component, OnInit } from '@angular/core';
import { LeveMvService } from './shared/Leve-Mv/leve-mv.service';
import { LojaService } from './shared/Lojas/lojas.service';
import { ProdutoService } from './shared/Produto/produto.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isAuthenticate: boolean = false;

  constructor(public leve: LeveMvService, public cliente: LojaService, public produto: ProdutoService){}

  ngOnInit(): void {
    this.leve.refreshList();
    this.cliente.refreshList();
    this.produto.refreshList();
  }
  title = 'LeveMvApp';
}
