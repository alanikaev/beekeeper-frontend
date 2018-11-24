import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken(): string{
    return window.localStorage.getItem('token');
  }

  getRToken(): string{
    return window.localStorage.getItem('rtoken');
  }

  saveTokens(token:string, rtoken:string){
    window.localStorage.setItem('token',token);
    window.localStorage.setItem('rtoken',rtoken);
  }

  destroyTokens(){
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('rtoken');
  }

}
