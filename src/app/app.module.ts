import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MenuSideBarComponent } from './home/menu-side-bar/menu-side-bar.component';
import { LeveMvComponent } from './Views/leve-mv/leve-mv.component';
import { LojasComponent } from './Views/lojas/lojas.component';
import { AppRoutingModule } from './app.routing';
import { FormLeveMvComponent } from './Views/leve-mv/form-leve-mv/form-leve-mv.component';
import { LoginComponent } from './login/login.component';
import { ListasComponent } from './Views/listas.component';
import { FormLojasComponent } from './Views/lojas/form-lojas/form-lojas.component';
import { ProdutosComponent } from './Views/produtos/produtos.component';
import { ProdutosFormComponent } from './Views/produtos/produtos-form/produtos-form.component';
import { FormVendaProdutosComponent } from './Views/produtos/form-venda-produtos/form-venda-produtos.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuSideBarComponent,
    LeveMvComponent,
    LojasComponent,
    FormLeveMvComponent,
    LoginComponent,
    ListasComponent,
    FormLojasComponent,
    ProdutosComponent,
    ProdutosFormComponent,
    FormVendaProdutosComponent   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule,
    ToastrModule.forRoot(),
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
