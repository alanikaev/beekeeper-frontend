import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken(): String{
    return window.localStorage('token');
  }

  saveTokens(token: String, rtoken: String){
    window.localStorage['token'] = token;
    window.localStorage['rtoken'] = token;
  }

  destroyTokens(){
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('rtoken');
  }

}
