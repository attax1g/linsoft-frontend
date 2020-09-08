import { FournisseurService } from './../../../services/fournisseur.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent implements OnInit {

  fournisseurs = [];
  term = '';
  page = 1;
  total: string;
  constructor( private fournissurService: FournisseurService,  private toastr: ToastrService){  }
  ngOnInit(): void {
      this.fetchFournisseur();
  }
  deleteFournisseur(id) {
    if (confirm('Are you sure to delete this Fournisseur')) {
      this.fournissurService.deleteFournisseur(id).subscribe(
        (resp: any) => {
          if (!resp.success) {
            this.toastr.error('Error', resp.error);
          } else {
            this.toastr.success('Fournisseur deleted', 'Success');
            this.fetchFournisseur();
          }
        }
      );
    }
  }

   fetchFournisseur(){
     this.fournisseurs = [];
     this.fournissurService.getAllFournisseur().subscribe( (data: any ) => {
     this.fournisseurs = data.results;
     let userHashMap = Object.create(null);
     this.fournisseurs = this.fournisseurs.filter((item, _) => {
        let alerdyExists = Object.prototype.hasOwnProperty.call(userHashMap, item.id);
        return alerdyExists ? false : userHashMap[item.id] = 1;
      });

    });
   }

}
