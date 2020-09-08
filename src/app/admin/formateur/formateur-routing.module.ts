import { ListFormateurInactiveComponent } from './components/list-formateur-inactive/list-formateur-inactive.component';
import { FormateurComponent } from './components/formateur/formateur.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFormateurComponent } from './components/list-formateur/list-formateur.component';
import { AddFormateurComponent } from './components/add-formateur/add-formateur.component';
import { EditFormateurComponent } from './components/edit-formateur/edit-formateur.component';
import { ShowFormateurComponent } from './components/show-formateur/show-formateur.component';

const routes: Routes = [
  {path: '',
  component: FormateurComponent,
  children: [
   {
      path: 'list-formateur',
      component: ListFormateurComponent,
    }
    , {
      path: 'add-formateur',
      component: AddFormateurComponent,
    },
     {
      path: 'edit-formateur/:id',
      component: EditFormateurComponent,
    },
    {
      path: 'show-formateur/:id',
      component: ShowFormateurComponent,
    },
    {
      path: 'list-formateur-inactive',
      component: ListFormateurInactiveComponent,
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormateurRoutingModule { }
