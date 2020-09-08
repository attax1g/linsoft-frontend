import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor( private http: HttpClient) { }
  getAllFournisseur() {
    return this.http.get(`${environment.apiUrl}/fournisseur/lists/address`);
  }
  getAllFournisseurAddressInactive() {
    return this.http.get(`${environment.apiUrl}/fournisseur/lists/address/inactive`);
  }
  getAllFournisseurInactive() {
    return this.http.get(`${environment.apiUrl}/fournisseur/lists/inactive`);
  }
  deleteFournisseur(id) {
    return this.http.put(`${environment.apiUrl}/fournisseur/delete/${id}` , null);
  }
  getFournisseurById(id) {
    return this.http.get(`${environment.apiUrl}/fournisseur/lists/four/${id}`); 
  }
  saveFournisseur(fournisseur) {
    return this.http.post(`${environment.apiUrl}/fournisseur/add` , fournisseur);
  }
  saveAddressFournisseur(fournisseur) {
    return this.http.post(`${environment.apiUrl}/fournisseur/add/address` , fournisseur);
  }
  getAdressFournisseurById(id) {
    return this.http.get(`${environment.apiUrl}/fournisseur/lists/address/${id}`);
  }
  getAdressFournisseurInactiveById(id) {
    return this.http.get(`${environment.apiUrl}/fournisseur/lists/address/inactive/${id}`);
  }
  getSeulAdressById(id) {
    return this.http.get(`${environment.apiUrl}/fournisseur/lists/address/seul/${id}`);
  }
  updateSeulAdressById(id, address) {
    return this.http.put(`${environment.apiUrl}/fournisseur/lists/update/address/seul/${id}`, address);
  }
  deleteSeulAdressById(id) {
    return this.http.put(`${environment.apiUrl}/fournisseur/lists/delete/address/seul/${id}`, null);
  }
  updateFournisseur(id, fournisseur) {
    return this.http.put(`${environment.apiUrl}/fournisseur/update/${id}`, fournisseur);
  }
}
