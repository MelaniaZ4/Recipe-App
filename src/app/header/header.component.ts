
import { AuthService } from './../auth/auth.service';
import { Component, OnDestroy, OnInit} from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
}
)

export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

collapsed = true;

ngOnInit(): void {
  this.userSub = this.authService.user.subscribe(user => {
    this.isAuthenticated = !!user; //same as: !userSub ? false : true;
  });

}

onSaveData() {
this.dataStorageService.storeRecipes();
}

onFetchData() {
this.dataStorageService.fetchRecipes().subscribe();
}

onLogout() {
  this.authService.logout();
 }
ngOnDestroy(): void {
  this.userSub.unsubscribe();
}

}
