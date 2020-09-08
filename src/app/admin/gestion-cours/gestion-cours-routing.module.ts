import { ViewCoursComponent } from './components/view-cours/view-cours.component';
import { ListCoursInactiveComponent } from './components/list-cours-inactive/list-cours-inactive.component';
import { EditCoursComponent } from './components/edit-cours/edit-cours.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { ListCategorieInactiveComponent } from './components/list-categorie-inactive/list-categorie-inactive.component';
import { EditCategorieComponent } from './components/edit-categorie/edit-categorie.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursComponent } from './components/cours/cours.component';
import { ListCoursComponent } from './components/list-cours/list-cours.component';

const routes: Routes = [
  {path: '',
  component: CoursComponent,
  children: [
   {
      path: 'list-categorie',
      component: ListCategoriesComponent,
    },
    {
      path: 'list-categorie-inactive',
      component: ListCategorieInactiveComponent,
    }
    , {
      path: 'add-categorie',
      component: AddCategorieComponent,
    },
     {
      path: 'edit-categorie/:id',
      component: EditCategorieComponent,
    },
    {
      path: 'list-cours',
      component: ListCoursComponent,
    },
    {
      path: 'add-cours',
      component: AddCoursComponent,
    },
    {
      path: 'edit-cours/:id',
      component: EditCoursComponent,
    },
    {
      path: 'show-cours/:id',
      component: ViewCoursComponent,
    },
    {
      path: 'list-cours-inactive',
      component: ListCoursInactiveComponent,
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionCoursRoutingModule { }
