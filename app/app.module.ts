import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import './rxjs-extensions';

import { AppComponent }  from './app.component';
import { DashboardComponent }  from './dashboard.component';

import { LoginComponent }  from './login/login.component';
import { LoginService } from "./login/login.service";
import { StorageService } from "./common/storage.service";
import { AuthService } from "./common/auth.service";
import { ConstantsService } from "./common/constants.service";

import { AppRoutingModule }  from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent
  ],
  providers: [
    AuthService,
    LoginService,
    StorageService,
    ConstantsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
