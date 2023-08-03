import { Component } from '@angular/core';
import { UserService } from '../auth/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent {

  constructor(public user: UserService, private router: Router){
    const nav = this.router.getCurrentNavigation();
    console.log(nav?.extras.state);
  }
}
