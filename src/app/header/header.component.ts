import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private dataStoredService:DataStorageService,private authService:AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      (user =>{
        this.isAuthenticated = !!user;
      })
    );
  }
  saveData() {
    this.dataStoredService.storeRecipes();
  }
  getData() {
    this.dataStoredService.getAllData().subscribe();
  }

  logOut() {
    this.authService.logOut();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
