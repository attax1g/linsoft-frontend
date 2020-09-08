import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/admin/services/session.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-session',
  templateUrl: './show-session.component.html',
  styleUrls: ['./show-session.component.css']
})
export class ShowSessionComponent implements OnInit {
  id;
  Result ;
   constructor(
    private sessionService: SessionService, private route: ActivatedRoute
   ) { }
   ngOnInit(): void {
     this.id = this.route.snapshot.paramMap.get('id');
     this.sessionService.getSessionById(this.id).subscribe( (resp: any) => {
       this.Result = resp.result[0];
   });
 }

}
