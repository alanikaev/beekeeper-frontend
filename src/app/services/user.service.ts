import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { map ,  distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private jwtService: JwtService, private http: HttpClient){}

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser         = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  populate(){
    if (this.jwtService.getToken()){
      const token = this.jwtService.getToken();
      const rtoken = this.jwtService.getRToken();
      this.setAuth(token, rtoken);
    }else{
      this.purgeAuth();
    }
  }

  purgeAuth(){
    this.jwtService.destroyTokens();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  setAuth(token:string, rtoken:string){
    let user: User = this.userData(token, rtoken);
    this.jwtService.saveTokens(user.token, user.rtoken);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  attemptAuth(type, credentials): Observable<any>{
    const route = (type == 'signin') ? '/api/v1/signin':'/api/v1/signup';
    return this.http.post(`${environment.api_url}${route}`, credentials).pipe(map(
      data => {
        this.setAuth(data['access_token'], data['refresh_token']);
        return data;
      }
    ));
  }

  logout(){
    this.http.post(`${environment.api_url}/api/v1/logout/access`, null).subscribe(
      data => {
        return;
      },
      err => {
        console.log("Logout error: ", err);
      }
    )
    this.purgeAuth();
  }

  getCurrentUser():User{
    return this.currentUserSubject.value;
  }

  userData(token:string, rtoken:string): User{
    const access_token = token;
    const refresh_token = rtoken;
    const token_parts = access_token.split(/\./);
    const dec = JSON.parse(window.atob(token_parts[1]));
    const user: User = {
      name: dec.identity,
      token: access_token,
      rtoken: refresh_token,
      token_expires: new Date(dec.exp * 1000)
    };
    return user;
  }
}
