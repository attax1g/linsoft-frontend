import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/admin/services/categorie.service';

@Component({
  selector: 'app-list-categorie-inactive',
  templateUrl: './list-categorie-inactive.component.html',
  styleUrls: ['./list-categorie-inactive.component.css']
})
export class ListCategorieInactiveComponent implements OnInit {
  categories = []
  term = "";
  constructor( private categorieService: CategorieService){  }
  ngOnInit(): void {
      this.fetchCategorie()
  }
   fetchCategorie(){
    this.categorieService.getAllCategoriesInactive().subscribe((data : any)=>{
      this.categories = data.results
    })
   }

}
