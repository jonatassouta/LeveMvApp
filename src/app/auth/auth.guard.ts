import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/*@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router, private login: UserService) {}

  canAcitivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  userLogged = localStorage.getItem('user_logged');
  userLogged = JSON.parse(userLogged);
  let url = state.url;
  if (userLogged) {
    if (route.data?.['role'] && route.data?.['role'].indexOf(userLogged.User.role) === -1) {
      // Se o perfil do usúario não está no perfil da rota
      this.router.navigate(['login'],
        { queryParams: { error: "Proibido o acesso a " + url } });
      return false;
    }
    return true;
  }
  router.navigate(['login'], { queryParams: { error: "Deve Fazer o login antes de acessar " + url } });
  return false;
}*/
export const AuthGuard: CanActivateFn = (

  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router: Router = inject(Router);
  const login: UserService = inject(UserService);
  const msg: ToastrService = inject(ToastrService);
  var userLogged = login.getUser();
  let url = state.url;

  if (userLogged) {
    if (route.data?.['role'] && route.data?.['role'].indexOf(userLogged.user.role) === -1) {
      // Se o perfil do usúario não está no perfil da rota
      router.navigate(['listas'],
        { queryParams: { error: "Proibido o acesso a " + url } });

      msg.error("Proibido o acesso a " + url, 'Acesso Negado')
      return false;
    }
    return true;
  }
  router.navigate(['login'], { queryParams: { error: "Deve Fazer o login antes de acessar " + url } });
  msg.error("Deve Fazer o login antes de acessar " + url, 'Acesso Negado')
  return false;
};
