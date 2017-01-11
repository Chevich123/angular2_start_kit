import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { ProfileService } from './profile.service';
import {AuthService} from "../common/auth.service";

@Component({
  moduleId: module.id,
  selector: 'profile-form',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {
  profile: Object = {};

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private location: Location,
    private auth: AuthService
  ) {
  }
  ngOnInit():void {
    this.profileService.getProfile(this.auth.current_id()).then((response) => {
      this.profile = response.json().data;
    }).catch((e) => {
      console.log('ERROR', e)
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.profileService.save(this.auth.current_id(), this.profile).then(() => this.goBack());
  }


}
