import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LeveMvComponent } from "./Views/leve-mv/leve-mv.component";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { ListasComponent } from "./Views/listas.component";
import { LojasComponent } from "./Views/lojas/lojas.component";
import { ProdutosComponent } from "./Views/produtos/produtos.component";

const APP_ROUTES: Routes = [
    {path: '', component: ListasComponent},
    {path: 'leveMv', component: LeveMvComponent},
    {path: 'login', component: LoginComponent},
    {path: 'listas', component: ListasComponent},
    {path: 'lojas', component: LojasComponent},
    {path: 'produtos', component: ProdutosComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }