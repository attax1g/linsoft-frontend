import { Component, OnInit } from '@angular/core';
import { FournisseurService } from 'src/app/admin/services/fournisseur.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-seul-address',
  templateUrl: './show-seul-address.component.html',
  styleUrls: ['./show-seul-address.component.css']
})
export class ShowSeulAddressComponent implements OnInit {
  id;
  page;
 Result ;
  constructor(
    private router: Router,  private fournissurService: FournisseurService, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.page = this.route.snapshot.paramMap.get('page');
    this.fournissurService.getSeulAdressById(this.id).subscribe((resp: any) => {
      this.Result = resp.result[0];
  });
}
 onBack(){
      this.router.navigate(['/admin/fournisseur/show-fournisseur', this.page ]);
    }
}
