import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CategorieService } from 'src/app/admin/services/categorie.service';
@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {
  CategorieForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    
   this.CategorieForm = this.formBuilder.group({
    nom_categorie: ['', [Validators.required]],
  });
  }

   // convenience getter for easy access to form fields
   get f()
    { return this.CategorieForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.CategorieForm.invalid) {
        return;
    }
    const categorie = {
      nom_categorie: this.CategorieForm.value.nom_categorie
    };
    this.categorieService.saveCategorie(categorie).subscribe((resp: any) => {
      if (!resp.success) {
        this.toastr.error("Error", resp.error);
      } else {
        this.toastr.success("Categorie created","Success");
        this.router.navigate(["/admin/cours/list-categorie"]);
      } 
    });
    
  }

}
