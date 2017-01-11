import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { LoginService } from './login.service';
import { Session } from './../common/session';

@Component({
  moduleId: module.id,
  selector: 'login-form',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent {
  session: Session;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private location: Location
  ) {
    this.session = new Session('andrey.rogachevich','**');
  }

  goBack(): void {
    this.location.back();
  }

  login(): void {
    this.loginService.createSession(this.session).then(() => {
      this.router.navigate(['/dashboard']);
    }).catch((e) => {
      console.log('ERROR', e)
    });
  }
}
