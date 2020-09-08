import { Component, OnInit } from '@angular/core';
import { FournisseurService } from 'src/app/admin/services/fournisseur.service';

@Component({
  selector: 'app-list-fournisseur-inactive',
  templateUrl: './list-fournisseur-inactive.component.html',
  styleUrls: ['./list-fournisseur-inactive.component.css']
})
export class ListFournisseurInactiveComponent implements OnInit {

  fournisseurs = [];
  term = '';
  page = 1;
  total: string;
  constructor( private fournissurService: FournisseurService){  }
  ngOnInit(): void {
      this.fetchFournisseur();
  }
   fetchFournisseur(){
     this.fournisseurs = [];
     this.fournissurService.getAllFournisseurAddressInactive().subscribe( (data: any ) => {
     this.fournisseurs = data.results;
     let userHashMap = Object.create(null);
     this.fournisseurs = this.fournisseurs.filter((item, _) => {
        let alerdyExists = Object.prototype.hasOwnProperty.call(userHashMap, item.id);
        return alerdyExists ? false : userHashMap[item.id] = 1;
      });

    });
   }

}
