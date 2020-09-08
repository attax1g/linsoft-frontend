import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FournisseurService } from 'src/app/admin/services/fournisseur.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-edit-fournisseur',
  templateUrl: './edit-fournisseur.component.html',
  styleUrls: ['./edit-fournisseur.component.css']
})
export class EditFournisseurComponent implements OnInit {
  FournisseurForm: FormGroup;
  submitted = false;
  submittedAdress = false;
  id;
  Result;
  fournisseurs;
  AddressForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private fournisseurService: FournisseurService, config: NgbModalConfig, private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  open(content) {
    this.modalService.open(content);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchFournisseur();
    this.fournisseurService.getFournisseurById(this.id).subscribe((resp: any) => {
      this.Result = resp.result[0];
      this.FournisseurForm.patchValue({
        nom_fournisseur : this.Result.nom_fournisseur
      });
    });
    this.FournisseurForm = this.formBuilder.group({
      nom_fournisseur: ['', [Validators.required]],
  });
    this.AddressForm = this.formBuilder.group({
    address: ['', [Validators.required]],
  });
  }

   // convenience getter for easy access to form fields
   get f()
    { return this.FournisseurForm.controls; }
    get fa()
    { return this.AddressForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.FournisseurForm.invalid) {
        return;
    }
    const fournisseur = {
      nom_fournisseur: this.FournisseurForm.value.nom_fournisseur
    };
    this.fournisseurService.updateFournisseur(this.id, fournisseur).subscribe((resp: any) => {
      if (!resp.success) {
        this.toastr.error('Error', resp.error);
      } else {
        this.toastr.success('Fournisseur updated', 'Success');
        this.router.navigate(['/admin/fournisseur/list-fournisseur']);
      }
    });
  }
  onSubmitAddress() {
    this.submittedAdress = true;
    // stop here if form is invalid
    if (this.AddressForm.invalid) {
        return;
    }
    const address = {
      address: this.AddressForm.value.address,
      nom_fornis: this.fournisseurs[0].nom_fornis
    };
    this.fournisseurService.saveAddressFournisseur(address).subscribe((resp: any) => {
      if (!resp.success) {
        this.toastr.error('Error', resp.error);
      } else {
        this.toastr.success('Address created', 'Success');
        this.modalService.dismissAll();
        this.fetchFournisseur();
        this.AddressForm.patchValue({
          address: ''
        });
      }
    });
  }
  fetchFournisseur(){
    this.fournisseurService.getAdressFournisseurById(this.id).subscribe( (data: any ) => {
      this.fournisseurs = data.result;
    });
   }
   editAddress(v, id){
    const Address = {
      address: v
    };
    this.fournisseurService.updateSeulAdressById(id, Address).subscribe((resp: any) => {
      if (!resp.success) {
        this.toastr.error('Error', resp.error);
      } else {
        this.fetchFournisseur();
        this.toastr.success('Address updated', 'Success');
      }
    });
   }
   deleteAddress(id){
    if (confirm('Are you sure to delete this Address')) {
      this.fournisseurService.deleteSeulAdressById(id).subscribe(
        (resp: any) => {
          if (!resp.success) {
            this.toastr.error('Error', resp.error);
          } else {
            this.toastr.success('Address deleted', 'Success');
            this.fetchFournisseur();
          }
        }
      );
    }
   }
}
