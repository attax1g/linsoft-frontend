import { CoursService } from './../../../services/cours.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent implements OnInit {

  cours = []
  term = "";
  page: number = 1;
  total: string;
  constructor( private coursService: CoursService,  private toastr: ToastrService){  }
  ngOnInit(): void {
      this.fetchCours()
  }
  deleteCours(id) {
    
    if (confirm("Are you sure to delete this cours")) {
      this.coursService.deleteCours(id).subscribe(
        (resp: any) => {
          if (!resp.success) {
            this.toastr.error("Error", resp.error);
          } else {
            this.toastr.success("Cours deleted","Success");
              this.fetchCours()
          }
        }
      );
    } 
  }

   fetchCours(){
    this.coursService.getAllCours().subscribe((data : any)=>{
      this.cours = data.results
    })
   }

}
