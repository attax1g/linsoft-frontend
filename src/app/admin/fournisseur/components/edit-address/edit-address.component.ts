import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FournisseurService } from 'src/app/admin/services/fournisseur.service';
@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  AddressForm: FormGroup;
  submitted = false;
  id;
  page;
  Result;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private fournisseurService: FournisseurService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.page = this.route.snapshot.paramMap.get('page');
    this.fournisseurService.getSeulAdressById(this.id).subscribe((resp: any) => {
      this.Result = resp.result[0];
      this.AddressForm.patchValue({
        address : this.Result.address
      });
    });
    this.AddressForm = this.formBuilder.group({
      address: ['', [Validators.required]],
  });
  }

   // convenience getter for easy access to form fields
   get f()
    { return this.AddressForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.AddressForm.invalid) {
        return;
    }
    const Address = {
      address: this.AddressForm.value.address
    };
    this.fournisseurService.updateSeulAdressById(this.id, Address).subscribe((resp: any) => {
      if (!resp.success) {
        this.toastr.error('Error', resp.error);
      } else {
        this.toastr.success('Address updated', 'Success');
        this.router.navigate(['/admin/fournisseur/show-fournisseur', this.page]);
      }
    });
  }
  onBack(){
    this.router.navigate(['/admin/fournisseur/show-fournisseur', this.page ]);
  }
}
