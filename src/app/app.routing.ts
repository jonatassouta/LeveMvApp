import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LeveMvComponent } from "./Views/leve-mv/leve-mv.component";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./auth/login/login.component";
import { ListasComponent } from "./Views/listas.component";
import { LojasComponent } from "./Views/lojas/lojas.component";
import { ProdutosComponent } from "./Views/produtos/produtos.component";
import { LoginRoutes } from "./auth/auth-routing.module";
import { AuthGuard } from "./auth/auth.guard";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'leveMv', component: LeveMvComponent, canActivate: [AuthGuard], data: {role:'Manager'}},
    {path: 'listas', component: ListasComponent, canActivate: [AuthGuard], data: {role:'Manager,Cliente'}},
    {path: 'lojas', component: LojasComponent, canActivate: [AuthGuard], data: {role:'Manager'}},
    {path: 'produtos', component: ProdutosComponent, canActivate: [AuthGuard], data: {role:'Manager,Cliente'}},
    ...LoginRoutes
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }