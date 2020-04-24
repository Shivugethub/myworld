import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  errorMsg:string = null;
  constructor(private authService:AuthService, private router:Router) {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  Authenticate(form: NgForm) {
    if(!form.valid) {
      return;
    }
    console.table(form.value);
    const email = form.value.email;
    const password = form.value.password;
    let AuthObservable: Observable<AuthResponseData>;
    this.isLoading = true;
    if(this.isLoginMode) {
      AuthObservable = this.authService.SignIn(email,password);
    } else {
      AuthObservable = this.authService.signUp(email,password);
    }
    AuthObservable.subscribe(
      (responseData) => {
        console.info(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.info(errorMessage);
        this.errorMsg = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
    setTimeout(()=>{
      console.clear();
    },8000)
  }
}
