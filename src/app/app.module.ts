import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HomeService } from './home/home.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { ModalService } from './modal.service';

import { HomeResolver } from './home/homeResolver.service';
import { InfoComponent } from './info/info.component';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	  { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'home', component: HomeComponent, resolve: { home: HomeResolver }},
    { path: 'info', component: InfoComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    ModalComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    Ng2ImgMaxModule,
    RouterModule.forRoot(routes),
    NgxImageZoomModule.forRoot()
  ],
  providers: [ 
    HomeService, 
    HomeResolver, 
    ModalService,
    RegisterService,
    LoginService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
