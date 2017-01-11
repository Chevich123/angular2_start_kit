import { Injectable }     from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Session }           from './session';
import 'rxjs/add/operator/toPromise';
import {StorageService} from "../common/storage.service";
import {ConstantsService} from "../common/constants.service";
import {AuthService} from "../common/auth.service";

@Injectable()
export class LoginService {

  constructor(
    private http:Http,
    private storage: StorageService,
    private constants: ConstantsService,
    private auth: AuthService) {
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  createSession(session: Session): Promise<Session> {
    return this.http
      .post(this.constants.session_url, {session: {username: session.username, password: session.password}})
      .toPromise()
      .then((response) => {
        session.token = response.json().data.authorization_token;
        session.password = null;
        this.storage.write('session', session);
        this.auth.changeAuthorized(true);
        return session;
      })
      .catch(this.handleError);
  }

  revokeSession(): Promise<Boolean> {
    let headers = new Headers({'Content-Type': 'application/json', 'X-Auth-Secret':this.auth.token()});
    return this.http
      .delete(this.constants.session_url, {headers: headers} )
      .toPromise()
      .then((response) => {
        var session = this.storage.read<Session>('session');
        session.token = null;
        this.storage.write('session', session);
        this.auth.changeAuthorized(false);
        return true;
      })
      .catch(this.handleError);
  }
}
