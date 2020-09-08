import { SessionService } from './../../../services/session.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-session',
  templateUrl: './list-session.component.html',
  styleUrls: ['./list-session.component.css']
})
export class ListSessionComponent implements OnInit {

  sessions = []
  term = "";
  page: number = 1;
  total: string;
  constructor( private sessionService: SessionService,  private toastr: ToastrService){  }
  ngOnInit(): void {
      this.fetchSession()
  }
  deleteSession(id) {
    if (confirm("Are you sure to delete this session")) {
      this.sessionService.deleteSession(id).subscribe(
        (resp: any) => {
          if (!resp.success) {
            this.toastr.error("Error", resp.error);
          } else {
            this.toastr.success("Session deleted","Success");
              this.fetchSession()
          }
        }
      );
    } 
    
  }

   fetchSession(){
    this.sessionService.getAllSession().subscribe((data: any ) => {
      this.sessions = data.results
    })
   }

}
