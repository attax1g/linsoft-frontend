import { Component, OnInit } from '@angular/core';
import { FormateurService } from 'src/app/admin/services/formateur.service';

@Component({
  selector: 'app-list-formateur-inactive',
  templateUrl: './list-formateur-inactive.component.html',
  styleUrls: ['./list-formateur-inactive.component.css']
})
export class ListFormateurInactiveComponent implements OnInit {
  formateurs = []
  term = "";
  page: number = 1;
  total: string;
  constructor(private formateurService: FormateurService) { }

  ngOnInit(): void {
    this.formateurService.getAllFormateurInactive().subscribe((data : any)=>{
      this.formateurs = data.results
    })
  }

}
