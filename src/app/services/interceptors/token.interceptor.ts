import { Injectable, NgModule } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(private usuarioService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var user = this.usuarioService.getUser();
    
    const dupReq = request.clone({
      headers: request.headers.set('authorization', (user && user.token) ? 'Bearer ' + user.token : ''),
    });
    return next.handle(dupReq);
  }
}
