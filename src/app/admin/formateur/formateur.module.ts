import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormateurRoutingModule } from './formateur-routing.module';
import { FormateurComponent } from './components/formateur/formateur.component';
import { ListFormateurComponent } from './components/list-formateur/list-formateur.component';
import { AddFormateurComponent } from './components/add-formateur/add-formateur.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EditFormateurComponent } from './components/edit-formateur/edit-formateur.component';
import { ShowFormateurComponent } from './components/show-formateur/show-formateur.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { FileSaverModule } from 'ngx-filesaver';
import { ListFormateurInactiveComponent } from './components/list-formateur-inactive/list-formateur-inactive.component';
@NgModule({
  declarations: [FormateurComponent, ListFormateurComponent, AddFormateurComponent, EditFormateurComponent, ShowFormateurComponent, ListFormateurInactiveComponent],
  imports: [
    CommonModule,
    FormateurRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FileSaverModule
  ]
})
export class FormateurModule { }
