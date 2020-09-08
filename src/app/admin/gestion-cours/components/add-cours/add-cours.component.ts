import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoursService } from 'src/app/admin/services/cours.service';
import { CategorieService } from 'src/app/admin/services/categorie.service';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {
  CoursForm: FormGroup;
  submitted = false;
  categories = []
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private coursService: CoursService,
    private categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    this.fetchCategorie()
   this.CoursForm = this.formBuilder.group({
    ref_form: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    duree: ['', [Validators.required]],
    version: ['', [Validators.required]],
    categorie: ['', [Validators.required]],
  });
  }

   // convenience getter for easy access to form fields
   get f()
    { return this.CoursForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.CoursForm.invalid) {
        return;
    }
    const cours = {
      ref_form: this.CoursForm.value.ref_form,
      designation: this.CoursForm.value.designation,
      duree: this.CoursForm.value.duree,
      version: this.CoursForm.value.version,
      categorie: this.CoursForm.value.categorie,
    };
    this.coursService.saveCours(cours).subscribe((resp: any) => {
      if (!resp.success) {
        this.toastr.error("Error", resp.error);
      } else {
        this.toastr.success("Cours created","Success");
        this.router.navigate(["/admin/cours/list-cours"]);
      }
    });
}
fetchCategorie(){
  this.categorieService.getAllCategories().subscribe((data : any)=>{
    this.categories = data.results
  })
 }
}
