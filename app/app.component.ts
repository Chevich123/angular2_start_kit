import { Component, OnInit } from '@angular/core';
import {AuthService} from "./common/auth.service";
import { Router }   from '@angular/router';
import {LoginService} from "./login/login.service";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `<h1>{{title}}</h1>
  <nav>
    <a *ngIf="authorized" routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    <a *ngIf="authorized" routerLink="/profile" routerLinkActive="active">Profile</a>
    <a *ngIf="authorized" (click)="logOut()">Log Out</a>
    <a *ngIf="!authorized" routerLink="/login" routerLinkActive="active">Log In</a>
  </nav>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css']
})

export class AppComponent {
  public authorized = false;
  title = 'My Test RESOURCEFUL App';
  subscription:Subscription;

  constructor(private auth:AuthService, private router: Router, private loginService: LoginService) {

  }

  assignAuthorized(value: booelan):String{
    this.authorized = value;
    if (value){
      this.title = this.auth.username();
    } else {
      this.title = 'My Test RESOURCEFUL App';
    }

  }

  ngOnInit(): void {
    this.subscription = this.auth.authorized$.subscribe((value) => {
      this.assignAuthorized(value);

    });
    this.assignAuthorized(this.auth.check_authorized());
  }

  logOut():void{
    console.log('LOG OUT');
    this.loginService.revokeSession().then(() => {
      this.authorized = false;
      this.router.navigate(['/dashboard']);
    }).catch((e) => {
      console.log('ERROR', e)
    });

  }
}
