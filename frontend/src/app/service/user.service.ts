import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'https://apiforapps.com/rodeApi/api/user';

  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getAll() {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }
  getByUsername(username: any) {
    return this.http.get(`${this.apiUrl}/username/${username}`);
  }
  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  delete(username: any) {
    return this.http.delete(`${this.apiUrl}/delete/${username}`);
  }

  update(username: any, data: any) {
    return this.http.put(`${this.apiUrl}/update/${username}`, data);
  }
}
