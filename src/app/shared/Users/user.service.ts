import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData: User = new User();
  readonly baseUrl = 'https:localhost:7044/api/account';
  
  constructor(private http: HttpClient) { }
  
  authenticate() {
    return this.http.post(this.baseUrl + '/login', this.formData);
  }
}
