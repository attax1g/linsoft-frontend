import { AddressInactiveComponent } from './components/address-inactive/address-inactive.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { ShowSeulAddressComponent } from './components/show-seul-address/show-seul-address.component';
import { ShowFournisseurComponent } from './components/components/show-fournisseur/show-fournisseur.component';
import { AddFournisseurComponent } from './components/add-fournisseur/add-fournisseur.component';
import { ListFournisseurInactiveComponent } from './components/list-fournisseur-inactive/list-fournisseur-inactive.component';
import { ListFournisseurComponent } from './components/list-fournisseur/list-fournisseur.component';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditFournisseurComponent } from './components/edit-fournisseur/edit-fournisseur.component';

const routes: Routes = [
  {path: '',
  component: FournisseurComponent,
  children: [
   {
      path: 'list-fournisseur',
      component: ListFournisseurComponent,
    },
    {
      path: 'list-fournisseur-inactive',
      component: ListFournisseurInactiveComponent,
    }
    , {
      path: 'add-fournisseur',
      component: AddFournisseurComponent,
    },
     {
      path: 'edit-fournisseur/:id',
      component: EditFournisseurComponent,
    },
    {
      path: 'show-fournisseur/:id',
      component: ShowFournisseurComponent,
    },
    {
     path: 'show-fournisseur-inactive/:id',
     component: AddressInactiveComponent,
   },
   {
    path: 'show-address/:id/:page',
    component: ShowSeulAddressComponent,
  },
  {
   path: 'edit-address/:id/:page',
   component: EditAddressComponent,
 }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }
