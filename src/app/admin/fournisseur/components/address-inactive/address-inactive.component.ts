import { Component, OnInit } from '@angular/core';
import { FournisseurService } from 'src/app/admin/services/fournisseur.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address-inactive',
  templateUrl: './address-inactive.component.html',
  styleUrls: ['./address-inactive.component.css']
})
export class AddressInactiveComponent implements OnInit {
  fournisseurs = [];
  id;
  constructor( private fournissurService: FournisseurService,  private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetchFournisseur();
  }
   fetchFournisseur(){
    this.fournissurService.getAdressFournisseurInactiveById(this.id).subscribe( (data: any ) => {
      this.fournisseurs = data.result;
    });
   }
}
