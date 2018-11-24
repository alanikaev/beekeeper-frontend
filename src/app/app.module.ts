import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthComponent } from './components/auth/auth.component';

import { UserService } from './services/user.service';

import { ShowAuthedDirective } from './directives/show-authed.directive';

import { HttpTokenInterceptor } from './interceprors/http.token.interceptor';

const appRouters: Routes =[
    {path:'signup', component: AuthComponent},
    {path:'signin', component: AuthComponent},
    {path:"**", redirectTo:'/'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    ShowAuthedDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRouters)
  ],
  providers: [
    UserService, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
