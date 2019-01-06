import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {Observable} from 'rxjs';

@Injectable()
export class AuthenticationService {
  // pour palier au probleme d'injection dans l'interceptor

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/authenticate/login', {email: email, password: password});
  }

  public get token() : string {
    const user: User = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      return user.token;
    }
    return null;
  }

  validateAccount(token: string): Observable<any> {
    return this.http.post('/api/authenticate/validate', {token: token});
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
