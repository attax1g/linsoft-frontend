import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor( private http: HttpClient) { }
  getAllCategories() {
    return this.http.get(`${environment.apiUrl}/categories/lists`);
  }
  getAllCategoriesInactive() {
    return this.http.get(`${environment.apiUrl}/categories/lists/inactive`);
  }
  deleteCategorie(id) {
    return this.http.put(`${environment.apiUrl}/categories/delete/${id}` ,null);
  }
  saveCategorie(categorie) {
    return this.http.post(`${environment.apiUrl}/categories/add` ,categorie);
  }
  getCategorieById(id) {
    return this.http.get(`${environment.apiUrl}/categories/lists/${id}`);
  }
  updateCategorie(id, categorie) {
    return this.http.put(`${environment.apiUrl}/categories/update/${id}`, categorie);
  }
}
