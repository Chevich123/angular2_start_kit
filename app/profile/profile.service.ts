import { Injectable }     from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ConstantsService} from "../common/constants.service";
import {AuthService} from "../common/auth.service";

@Injectable()
export class ProfileService {

  constructor(
    private http:Http,
    private constants: ConstantsService,
    private auth: AuthService) {
  }

  getProfile(id): Promise<Object> {
    let headers = new Headers({'Content-Type': 'application/json', 'X-Auth-Secret':this.auth.token()});
    let url = this.constants.profile_url;
    return this.http
      .get(url+`/${id}`, {headers: headers})
      .toPromise();
  }

  save(id, profile): Promise<Object> {
    let headers = new Headers({'Content-Type': 'application/json', 'X-Auth-Secret':this.auth.token()});
    let url = this.constants.profile_url;
    return this.http
      .patch(url+`/${id}`, JSON.stringify({user: profile}), {headers: headers})
      .toPromise()
      .then(() => profile)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
  }
}
