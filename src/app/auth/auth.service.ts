import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpriationTimer:any;
  constructor(private http: HttpClient, private router:Router) { }
  API_ENDPOINT = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  SIGNUP_URL: string = this.API_ENDPOINT + 'signUp?key=AIzaSyARLOw01YzMdK1kJ22k1HqUhkjKuTFu89Q';
  SIGIN_URL: string = this.API_ENDPOINT + 'signInWithPassword?key=AIzaSyARLOw01YzMdK1kJ22k1HqUhkjKuTFu89Q';
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.SIGNUP_URL, {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError), tap(responseData => {
      this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
    }));
  }
  SignIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.SIGIN_URL, {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError), tap(responseData => {
      this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
    }));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;

    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }
    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
    if(loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuartion = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuartion);
    }
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpriationTimer) {
      clearTimeout(this.tokenExpriationTimer);
    }
    this.tokenExpriationTimer = null;
  }

  autoLogOut(expirationDuartion: number) {
    this.tokenExpriationTimer = setTimeout( ()=> {
      this.logOut();
    },expirationDuartion);
  }
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
    this.autoLogOut(expiresIn * 1000);
  }
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMsg);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email aready exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'Email not found! Please SignUp or enter proper Email';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'Invalid Password! Please enter correct Password';
        break;
      case 'USER_DISABLED':
        errorMsg = 'Sorry this account as been disabled please contact admin';
    }
    return throwError(errorMsg);
  }
}
