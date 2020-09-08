import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  constructor(
    private http: HttpClient
  ) { }
  getAllFormateur() {
    return this.http.get(`${environment.apiUrl}/utilisateur/lists`);
  }
  getAllFormateurInactive() {
    return this.http.get(`${environment.apiUrl}/utilisateur/lists/inactive`);
  }
  saveFormateur(formateur){
    return this.http.post(`${environment.apiUrl}/utilisateur/register`, formateur);
  }
  deleteFormateur(id){
    return this.http.put(`${environment.apiUrl}/utilisateur/delete/${id}`, null);
  }
  getFormateurById(id){
    return this.http.get(`${environment.apiUrl}/utilisateur/list/${id}`);
  }
  getAllFormateurCertifById(id){
    return this.http.get(`${environment.apiUrl}/formateur/upload/lists/certif/${id}`);
  }
  getAllFormateurCvById(id){
    return this.http.get(`${environment.apiUrl}/formateur/upload/lists/cv/${id}`);
  }
  downloadCertifById(name){
    return this.http.get(`${environment.apiUrl}/formateur/upload/certif/download/${name}` , {responseType: 'blob' as 'json'});
   }
  downloadCvById(name){
    return this.http.get(`${environment.apiUrl}/formateur/upload/cv/download/${name}`, {responseType: 'blob' as 'json'});
  }
  editFormateur(id,formateur){
    return this.http.put(`${environment.apiUrl}/utilisateur/edit/${id}`, formateur);
  }
  changePassword(id, email){
    return this.http.put(`${environment.apiUrl}/utilisateur/editPassword/${id}/${email}`,null);
  }
  saveCertifFormateur(email, file){
    return this.http.post(`${environment.apiUrl}/formateur/upload/add/certif/${email}`, file);
  }
  saveCvFormateur(email, file){
    return this.http.post(`${environment.apiUrl}/formateur/upload/add/cv/${email}`, file);
  }
}
