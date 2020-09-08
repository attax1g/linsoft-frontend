import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';
import { ListFournisseurComponent } from './components/list-fournisseur/list-fournisseur.component';
import { ListFournisseurInactiveComponent } from './components/list-fournisseur-inactive/list-fournisseur-inactive.component';
import { AddFournisseurComponent } from './components/add-fournisseur/add-fournisseur.component';
import { EditFournisseurComponent } from './components/edit-fournisseur/edit-fournisseur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShowFournisseurComponent } from './components/components/show-fournisseur/show-fournisseur.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowSeulAddressComponent } from './components/show-seul-address/show-seul-address.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { AddressInactiveComponent } from './components/address-inactive/address-inactive.component';


@NgModule({
  declarations: [FournisseurComponent, ListFournisseurComponent, ListFournisseurInactiveComponent, AddFournisseurComponent, EditFournisseurComponent, ShowFournisseurComponent, ShowSeulAddressComponent, EditAddressComponent, AddressInactiveComponent],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgbModule
  ]
})
export class FournisseurModule { }
