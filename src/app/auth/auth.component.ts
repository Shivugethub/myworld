import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { AlertComponent} from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMsg:string = null;
  @ViewChild(PlaceHolderDirective, {static:false}) alertHost: PlaceHolderDirective;
  private closeSub: Subscription;
  constructor(private authService:AuthService, private router:Router, private componentFactoryResolver: ComponentFactoryResolver) {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  Authenticate(form: NgForm) {
    if(!form.valid) {
      return;
    }
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
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.errorMsg = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
    form.reset();
    setTimeout(()=>{
      console.clear();
    },8000)
  }
  private showErrorAlert(errorMsg:string) {
    // const alertComp = new AlertComponent();
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCompFactory);
    componentRef.instance.message = errorMsg;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy() {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
