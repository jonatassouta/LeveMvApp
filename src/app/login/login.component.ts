import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/Users/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public constructor(public user: UserService, private toastr: ToastrService) {
  }
  ngOnInit(): void {
  }

  authenticate() {

    var s = this.user.formData.userName;
    this.user.authenticate().subscribe(data => {
      debugger;
      if (data) {
        this.toastr.success('Logado de Sucesso', 'Usuario');
      } else {
        this.toastr.success('Erro, Usuario ou senha incorreto', 'Usuario');
      } 
    }, error => {
        console.log(error)
        this.toastr.error('Erro, Usuario ou senha incorreto', 'Usuario');
      })
  }
}
