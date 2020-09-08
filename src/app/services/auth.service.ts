import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  auth(user) {
    return this.http.post(`${environment.apiUrl}/utilisateur/auth`, user);
  }
  saveUser(token, user) {
    localStorage.setItem("Authtoken", token);
    localStorage.setItem("User", JSON.stringify(user));
  }
  isLogedin(): boolean {
    if (localStorage.getItem("Authtoken")) {
      return true;
    } else {
      return false;
    }
  }

  Logout() {
    localStorage.removeItem("Authtoken");
    localStorage.removeItem("User");
  }
  forgetPassword(email){
    return this.http.get(`${environment.apiUrl}/utilisateur/forget/${email}`);
  }
  getcurrentuser(): Observable<any> {
    return of(JSON.parse(localStorage.getItem("User")));
  }
  listUser() {
    return this.http.get(`${environment.apiUrl}/utilisateur/list`);
  }
}
