import { Injectable }     from '@angular/core';
import { StorageService } from "./storage.service";
import {Session} from "../login/session";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  private _authorizedItem = new BehaviorSubject<boolean>(0);
  authorized$ = this._authorizedItem.asObservable();

  constructor(private storage: StorageService){}

  changeAuthorized(value:boolean){
    this._authorizedItem.next(value);
  }

  session():Session{
    return this.storage.read<session>('session')
  }

  token():String{
    return this.session()['token']
  }

  username():String{
    return this.session()['username']
  }

  check_authorized():Boolean{
    return !(this.token() === null);
  }
}
