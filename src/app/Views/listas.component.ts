import { Component } from '@angular/core';
import { UserService } from '../shared/Users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent {

  constructor(public user: UserService){}
}
