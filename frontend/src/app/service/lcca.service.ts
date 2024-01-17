import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LccaService {
  // private readonly apiUrl = 'http://localhost:3000/api/lcca';
  private readonly apiUrl = 'https://apiforapps.com/rodeApi/api/lcca';

  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  getAll() {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }
  getBySectionId(id: any) {
    return this.http.get(`${this.apiUrl}/getBySectionId/${id}`);
  }
  getByUserName(username: any) {
    return this.http.get<any[]>(`${this.apiUrl}/getByUsername/${username}`);
  }
  update(sectionId: any, data: any) {
    return this.http.put(`${this.apiUrl}/update/${sectionId}`, data);
  }

  delete(sectionId: number) {
    return this.http.delete(`${this.apiUrl}/delete/${sectionId}`);
  }
}
