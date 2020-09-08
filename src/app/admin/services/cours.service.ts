import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor( private http: HttpClient) { }
  getAllCours() {
    return this.http.get(`${environment.apiUrl}/cours/lists`);
  }
  getAllCoursInactive() {
    return this.http.get(`${environment.apiUrl}/cours/lists/inactive`);
  }
  deleteCours(id) {
    return this.http.put(`${environment.apiUrl}/cours/delete/${id}` , null);
  }
  saveCours(cours) {
    return this.http.post(`${environment.apiUrl}/cours/add` , cours);
  }
  getCoursById(id) {
    return this.http.get(`${environment.apiUrl}/cours/lists/${id}`);
  }
  updateCours(id, cours) {
    return this.http.put(`${environment.apiUrl}/cours/update/${id}`, cours);
  }
}
