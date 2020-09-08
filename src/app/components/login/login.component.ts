import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    const logedin = this.authService.isLogedin();
    if (logedin) {
      this.router.navigate(["/admin"]);
    }

    this.loginForm = this.formBuilder.group({
     
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }

   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

  onSubmit() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    
    this.authService.auth(user).subscribe((resp: any) => {   
      if (!resp.success) {
        this.toastr.error("Error", resp.message);
      } else if (resp.results[0].role === "admin") {
        this.toastr.success("Success");
        this.router.navigate(["/admin"]);
        this.authService.saveUser(resp.token, resp.results[0]);
      } else if (resp.results[0].role === "formateur") {
        this.toastr.success("Success");
        this.router.navigate(["/formateur"]);
        this.authService.saveUser(resp.token, resp.results[0]);
      }
    }); 
}
}
