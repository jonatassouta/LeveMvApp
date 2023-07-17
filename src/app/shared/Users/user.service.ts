import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData: User = new User();
  private readonly baseUrl = `${environment.API}api/account`;
  userLogged: any;
  isAuthenticate: boolean = false;
  
  constructor(private http: HttpClient) { }
  
  authenticate() {
    return this.http.post(this.baseUrl + '/login', this.formData);
  }

  postUserData(data: any){
    localStorage.setItem('user_logged', JSON.stringify(data));
  }

  getUser(){
    this.userLogged = localStorage.getItem('user_logged');
    this.userLogged = JSON.parse(this.userLogged);
    this.isAuthenticate = this.userLogged != null;
    return this.userLogged;
   }
}
