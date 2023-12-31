import { Component, OnInit } from '@angular/core';
import { LeveMvService } from './shared/Leve-Mv/leve-mv.service';
import { LojaService } from './shared/Lojas/lojas.service';
import { ProdutoService } from './shared/Produto/produto.service';
import { LoginComponent } from './auth/login/login.component';
import { UserService } from './auth/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  product: any;
  isAuthenticaded:boolean = false;
  userLogged: any;

  constructor(private http: HttpClient, public leve: LeveMvService, public cliente: LojaService, public produto: ProdutoService, private router: Router, public user: UserService){ }

  ngOnInit(): void {
    this.leve.refreshList();
    this.cliente.refreshList();
    this.produto.refreshList();

    this.userLogged = this.user.getUser();
    this.isAuthenticaded = this.userLogged != null;
  }
  title = 'LeveMvApp';

  logout(){
    this.isAuthenticaded = false;
    localStorage.removeItem('user_logged')
    this.router.navigate(['login']).then( nav => {
      window.location.reload();
    })
  }
}
