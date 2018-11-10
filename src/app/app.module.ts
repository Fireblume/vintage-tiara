import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FormsModule }   from '@angular/forms';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HomeService } from './home/home.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { ModalService } from './modal.service';
import { AdminLoginService } from './admin-login/admin-login.service';
import { DashboardService } from './dashboard/dashboard.service';
import { CartService } from './cart/cart.service';
import { BaseService } from './base/base.service';

import { BaseResolver } from './base/baseResolver.service';
import { HomeResolver } from './home/homeResolver.service';

import { InfoComponent } from './info/info.component';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';

import { EqualValidator } from './equalValidator.directive';
import { environment } from '../environments/environment';
import { BaseComponent } from './base/base.component';


const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: '', component: BaseComponent, 
        resolve: {base: BaseResolver},
        children: [
            { path: 'home', component: HomeComponent,resolve: {home: HomeResolver}},
            { path: 'info', component: InfoComponent},
            { path: 'login', component: LoginComponent},
            { path: 'register', component: RegisterComponent},
            { path: 'admin', component: AdminLoginComponent},
            { path: 'admin/dashboard', component: DashboardComponent},
            { path: 'cart', component: CartComponent},
        ]
    }    
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    ModalComponent,
    LoginComponent,
    RegisterComponent,
    AdminLoginComponent,
    DashboardComponent,
    EqualValidator,
    CartComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    Ng2ImgMaxModule,
    RouterModule.forRoot(routes),
    NgxImageZoomModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    SlimLoadingBarModule
  ],
  providers: [ 
    HomeService,
    ModalService,
    RegisterService,
    LoginService,
    AdminLoginService,
    DashboardService,
    CartService,
    BaseResolver,
    BaseService,
    HomeResolver
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
