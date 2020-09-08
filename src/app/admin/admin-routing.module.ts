import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';

import { ContentComponent } from './components/content/content.component';

const routes: Routes = [
  {path: '',
  component: AdminComponent,
  children: [
    {
      path: '',
      component: ContentComponent,
    },
    {
      path: 'formateur',
      loadChildren: () => import('./formateur/formateur.module')
        .then(m => m.FormateurModule),
    },
    {
      path: 'cours',
      loadChildren: () => import('./gestion-cours/gestion-cours.module')
        .then(m => m.GestionCoursModule),
    },
    {
      path: 'session',
      loadChildren: () => import('./session/session.module')
        .then(m => m.SessionModule),
    },
    {
      path: 'fournisseur',
      loadChildren: () => import('./fournisseur/fournisseur.module')
        .then(m => m.FournisseurModule),
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
