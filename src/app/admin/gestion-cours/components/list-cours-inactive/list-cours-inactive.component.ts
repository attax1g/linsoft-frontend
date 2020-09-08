import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/admin/services/cours.service';

@Component({
  selector: 'app-list-cours-inactive',
  templateUrl: './list-cours-inactive.component.html',
  styleUrls: ['./list-cours-inactive.component.css']
})
export class ListCoursInactiveComponent implements OnInit {
  cours = []
  term = "";
  page: number = 1;
  total: string;
  constructor( private coursService: CoursService){  }
  ngOnInit(): void {
      this.fetchCours()
  }
   fetchCours(){
    this.coursService.getAllCoursInactive().subscribe((data: any) => {
      this.cours = data.results
    })
   }

}
