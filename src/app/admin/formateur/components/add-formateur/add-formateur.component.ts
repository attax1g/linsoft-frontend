import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormateurService } from 'src/app/admin/services/formateur.service';

@Component({
  selector: 'app-add-formateur',
  templateUrl: './add-formateur.component.html',
  styleUrls: ['./add-formateur.component.css']
})
export class AddFormateurComponent implements OnInit {
  FormateurForm: FormGroup;
  submitted = false;
  file = [];
  cv = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private formateurService: FormateurService
  ) {}

  ngOnInit(): void {
   this.FormateurForm = this.formBuilder.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tele: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      fonction: ['', [Validators.required]],
  });
  }

   // convenience getter for easy access to form fields
   get f()
    { return this.FormateurForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.FormateurForm.invalid) {
        return;
    }
    const formateur = {
      nom: this.FormateurForm.value.nom,
      prenom: this.FormateurForm.value.prenom,
      email: this.FormateurForm.value.email,
      tele: this.FormateurForm.value.tele,
      fonction: this.FormateurForm.value.fonction
    };
    this.formateurService.saveFormateur(formateur).subscribe( async (resp: any) => {
      if (!resp.success) {
        this.toastr.error('Error', resp.error);
      } else {
      if (this.file) {
      await this.file.forEach(f => {
          const formData = new FormData();
          formData.append('file', f);
          this.formateurService.saveCertifFormateur(formateur.email, formData).subscribe((respo: any) => {
            if (!respo.success) {
              this.toastr.error('Error', respo.error);
            }
          });
        });
      }
      if (this.cv) {
        this.cv.forEach(c => {
          const formDataCV = new FormData();
          formDataCV.append('file', c);
          this.formateurService.saveCvFormateur(formateur.email, formDataCV).subscribe((respoS: any) => {
            if (!respoS.success) {
              this.toastr.error('Error', respoS.error);
            }
          });
        });
      }
      this.toastr.success('Formateur created', 'Success');
      this.router.navigate(['/admin/formateur/list-formateur']);
      }
    });
  }
  selectCertif(files){
    if (files) {
    const select = files;
    for (let index = 0; index < select.length; index++){
         this.file.push(select[index]);
     }
    }
  }
  selectcv(e){
    if (e) {
    const selectCV = e;
    for (let i = 0; i < selectCV.length; i++){
         this.cv.push(selectCV[i]);
     }
    }
  }
}