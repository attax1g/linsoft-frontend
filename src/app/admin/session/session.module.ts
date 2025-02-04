import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { SessionComponent } from './components/session/session.component';
import { ListSessionComponent } from './components/list-session/list-session.component';
import { AddSessionComponent } from './components/add-session/add-session.component';
import { EditSessionComponent } from './components/edit-session/edit-session.component';
import { ListSessionInactiveComponent } from './components/list-session-inactive/list-session-inactive.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowSessionComponent } from './components/show-session/show-session.component';
@NgModule({
  declarations: [SessionComponent, ListSessionComponent, AddSessionComponent, EditSessionComponent, ListSessionInactiveComponent, ShowSessionComponent],
  imports: [
    CommonModule,
    SessionRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class SessionModule { }
