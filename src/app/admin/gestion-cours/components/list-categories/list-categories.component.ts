import { CategorieService } from './../../../services/categorie.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
  categories = []
  term = "";
  
  constructor( private categorieService: CategorieService,  private toastr: ToastrService){  }
  ngOnInit(): void {
      this.fetchCategorie()
  }
  deleteCategorie(id) {
    if (confirm("Are you sure to delete this categorie")) {
      this.categorieService.deleteCategorie(id).subscribe(
        (resp: any) => {
          if (!resp.success) {
            this.toastr.error("Error", resp.error);
          } else {
            this.toastr.success("Categorie deleted","Success");
              this.fetchCategorie()
          }
        }
      );
    } 
  }

   fetchCategorie(){
    this.categorieService.getAllCategories().subscribe((data : any)=>{
      this.categories = data.results
    })
   }

}
