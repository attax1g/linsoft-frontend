import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor( private http: HttpClient) { }
  getAllSession() {
    return this.http.get(`${environment.apiUrl}/session/lists`);
  }
  getAllSessionInactive() {
    return this.http.get(`${environment.apiUrl}/session/lists/inactive`);
  }
  deleteSession(id) {
    return this.http.put(`${environment.apiUrl}/session/delete/${id}` , null);
  }
  saveSession(session) {
    return this.http.post(`${environment.apiUrl}/session/add` , session);
  }
  getSessionById(id) {
    return this.http.get(`${environment.apiUrl}/session/lists/${id}`);
  }
  updateSession(id, session) {
    return this.http.put(`${environment.apiUrl}/session/update/${id}`, session);
  }
}
