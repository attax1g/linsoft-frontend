import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/admin/services/session.service';

@Component({
  selector: 'app-list-session-inactive',
  templateUrl: './list-session-inactive.component.html',
  styleUrls: ['./list-session-inactive.component.css']
})
export class ListSessionInactiveComponent implements OnInit {

  sessions = []
  term = "";
  page: number = 1;
  total: string;
  constructor( private sessionService: SessionService){  }
  ngOnInit(): void {
    this.sessionService.getAllSessionInactive().subscribe((data: any ) => {
      this.sessions = data.results
    })
  }

}
