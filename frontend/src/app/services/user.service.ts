import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, UserPayload } from '../models/user.model';

const API_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private url = `${API_URL}/users`;

  me() { return this.http.get<User>(`${this.url}/me`); }
  list() { return this.http.get<User[]>(this.url); }
  create(body: UserPayload) { return this.http.post<User>(this.url, body); }
  update(id: string, body: UserPayload) { return this.http.put<User>(`${this.url}/${id}`, body); }
  remove(id: string) { return this.http.delete<void>(`${this.url}/${id}`); }
}
