import { Address } from './../../model/Address.model';

import { FournisseurService } from './../../../services/fournisseur.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators , FormArray  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css']
})
export class AddFournisseurComponent implements OnInit {

  FournisseurForm: FormGroup;
  submitted = false;
  address = new Address();
  dataarray = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private fournisseurService: FournisseurService
  ) { }

  ngOnInit(): void {
    this.addForm();
    this.FournisseurForm = this.formBuilder.group({
    nom_fournisseur: ['', [Validators.required]],
  });
  }

   // convenience getter for easy access to form fields
   get f()
    { return this.FournisseurForm.controls; }

  onSubmit() {
    this.submitted = true;
    let allEmpty = false;
    this.dataarray.forEach(ver => {
       allEmpty = Object.keys(ver).every((key) => {
        return ver[key].length === 0;
        });
    });
    // stop here if form is invalid
    if (this.FournisseurForm.invalid || allEmpty ) {
        return;
    }
    const fournisseur = {
      nom_fournisseur: this.FournisseurForm.value.nom_fournisseur,
    };
    const arrayAddressFournisseur = [];
    this.dataarray.forEach(add => {
      arrayAddressFournisseur.push(add.address);
    });
    const addressFournisseur = {
      address:  arrayAddressFournisseur
    };
    this.fournisseurService.saveFournisseur(fournisseur).subscribe((resp: any) => {
      if (!resp.success) {
        this.toastr.error('Error', resp.error);
      } else {
        addressFournisseur.address.forEach(addr => {
          const adrresFour = {
            nom_fornis: this.FournisseurForm.value.nom_fournisseur,
            address: addr
          };
          this.fournisseurService.saveAddressFournisseur(adrresFour).subscribe((respo: any) => {
            if (!respo.success) {
              this.toastr.error('Error', respo.error);
            }
          });
        });
        this.toastr.success('Fournisseur created', 'Success');
        this.router.navigate(['/admin/fournisseur/list-fournisseur']);
      }
    });
  }
  addForm(){
   this.address = new Address();
   this.dataarray.push(this.address);
  }
  deleteForm(i){
    this.dataarray.splice(i, 1);
  }
}
