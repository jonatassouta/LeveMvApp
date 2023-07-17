import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/Users/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  imagePath = 'assets/logo/logo.png'

  public constructor(public user: UserService, private toastr: ToastrService, public router: Router) {
  }

  authenticate() {
    this.user.authenticate().subscribe((data: any) => {
      if (data.user) {
        this.toastr.success('Logado de Sucesso', 'Usuario');
        this.user.postUserData(data);
        this.router.navigate(['/listas']).then(nav => {
          window.location.reload();
        })
      } else {
        this.toastr.success('Erro, Usuario ou senha incorreto', 'Usuario');
      }
    }, error => {
      console.log(error.error);
      this.toastr.error('Erro, Usuario ou senha incorreto', 'ERRO');
    })
  }
}
