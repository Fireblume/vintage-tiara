import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HomeService } from './home/home.service';
import { HomeResolver } from './home/homeResolver.service';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'home', component: HomeComponent, resolve: { home: HomeResolver }},
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ HomeService, HomeResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
