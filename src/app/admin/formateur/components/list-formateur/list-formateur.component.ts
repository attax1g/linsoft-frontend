import { Component, OnInit  } from '@angular/core';
import { FormateurService } from '../../../services/formateur.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-formateur',
  templateUrl: './list-formateur.component.html',
  styleUrls: ['./list-formateur.component.css']
})
export class ListFormateurComponent implements OnInit {
  formateurs = []
  term = "";
  page: number = 1;
  total: string;
constructor( private formateurService: FormateurService,  private toastr: ToastrService,){  }
  ngOnInit(): void {
      this.fetchFormateur()
  }
  deleteFormateur(id) {
    if (confirm("Are you sure to delete this formateur")) {
      this.formateurService.deleteFormateur(id).subscribe(
        (resp: any) => {
          if (!resp.success) {
            this.toastr.error("Error", resp.error);
          } else {
            this.toastr.success("Formateur deleted","Success");
              this.fetchFormateur()
          }
        }
       
      );
    }
  }

   fetchFormateur(){
    this.formateurService.getAllFormateur().subscribe((data : any)=>{
      this.formateurs = data.results
    })
   }


}
