import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { tokenNotExpired } from '@auth0/angular-jwt/auth0-angular-jwt';
// import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

import {  map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
 //     this.isDev = true;  // Change to false before deployment
      }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
   // return this.http.post('http://localhost:3000/users/register', user, {headers: headers});
    // For Heroku
    return this.http.post('/users/register', user, {headers: headers});
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/authenticate', user, {headers: headers})
      .pipe(map(res => res));
  }

  getProfile() {
    // let headers = new HttpHeaders();
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.authToken,
      'Content-Type': 'application/json'
    });
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'application/json');
    return this.http.get('/users/profile', {headers: headers});
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    // return tokenNotExpired('id_token');
    return !this.jwtHelper.isTokenExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
