import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import {User} from '../_models/index';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('/api/user/getAll');
  }

  create(user: User) {
    return this.http.post('/api/user/create', user, {responseType: 'text'});
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>('/api/user/' + id);
  }

  update(user: User) {
    return this.http.put('/api/user/' + user.email, user);
  }

  delete(id: number) {
    return this.http.delete('/api/user/' + id);
  }
}
