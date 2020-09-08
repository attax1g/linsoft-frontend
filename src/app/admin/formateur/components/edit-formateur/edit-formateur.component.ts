import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { FormateurService } from 'src/app/admin/services/formateur.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-edit-formateur',
  templateUrl: './edit-formateur.component.html',
  styleUrls: ['./edit-formateur.component.css']
})
export class EditFormateurComponent implements OnInit {
  editFormateurForm: FormGroup;
  submitted = false;
   id;
   Result;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private formateurService: FormateurService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.formateurService.getFormateurById(this.id).subscribe((resp: any) => {
      this.Result = resp.result[0] 
      this.editFormateurForm.patchValue({
        nom: this.Result.nom,
        prenom: this.Result.prenom,
        email: this.Result.email,
        tele: this.Result.tele,
        fonction: this.Result.fonction
      });
    }) 
    this.editFormateurForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        tele: ['', [Validators.required]],
        fonction: ['', [Validators.required]],
    });
  }
  get f()
  { return this.editFormateurForm.controls; }

onSubmit() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.editFormateurForm.invalid) {
      return;
  }
  const editformateur = {
    nom: this.editFormateurForm.value.nom,
    prenom: this.editFormateurForm.value.prenom,
    email: this.editFormateurForm.value.email,
    tele: this.editFormateurForm.value.tele,
    fonction: this.editFormateurForm.value.fonction 
  };
  this.formateurService.editFormateur(this.id, editformateur).subscribe((resp: any) => {
    if (!resp.success) {
      this.toastr.error("Error", resp.error);
    } else {
      this.toastr.success("Formateur updated","Success");
      this.router.navigate(["/admin/formateur/list-formateur"]);
    } 
  }); 
}

}
