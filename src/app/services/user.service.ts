import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private jwtService: JwtService) { }

  populate(){
    if (this.jwtService.getToken()){
      return;
    }else{
      this.purgeAuth();
    }
  }

  purgeAuth(){
    this.jwtService.destroyTokens();
  }
}
