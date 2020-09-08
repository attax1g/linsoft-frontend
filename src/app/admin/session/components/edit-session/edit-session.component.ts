import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CoursService } from 'src/app/admin/services/cours.service';
import { SessionService } from 'src/app/admin/services/session.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import countries from 'src/app/countries.json';
@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit {
  debut: NgbDateStruct;
  fin: NgbDateStruct;
  Model: NgbDateStruct;
  SessionForm: FormGroup;
  submitted = false;
  cours = [];
  id;
  newDateDebut: any;
  Result;
  year: any;
  month: any;
  day: any;
  a: any;
  title = 'json-file-read-angular';
  public countryList: {name: string, code: string}[] = countries;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private coursService: CoursService,
    private sessionService: SessionService,
    private route: ActivatedRoute
  ) { }

   ngOnInit(): void {
    this.fetchCours();
    this.id = this.route.snapshot.paramMap.get('id');
    this.sessionService.getSessionById(this.id).subscribe( async (resp: any) => {
      this.Result = resp.result[0];
      this.newDateDebut = moment(this.Result.date_debut).format('YYYY-MM-DD');
      this.a = new Date(this.Result.date_debut);
      this.year = this.a.getFullYear();
      this.month = this.a.getMonth() + 1;
      this.day = this.a.getDate();
      this.debut = {
        year: this.year,
        month: this.month,
        day: this.day
      };
      this.SessionForm.patchValue({
        ref_formation: this.Result.ref_formation,
        type: this.Result.type,
        date_debut: this.debut,
        langue: this.Result.langue,
        lieu: this.Result.lieu,
        address: this.Result.address,
        etat_session: this.Result.etat_session
      });
    });
    this.SessionForm = this.formBuilder.group({
      ref_formation: ['', [Validators.required]],
      date_debut: ['', [Validators.required]],
      type: ['', [Validators.required]],
      langue: ['', [Validators.required]],
      lieu: ['', [Validators.required]],
      address: ['', [Validators.required]],
      etat_session: ['en attente de confirmation', [Validators.required]]
    });
  }

   // convenience getter for easy access to form fields
   get f()
    { return this.SessionForm.controls; }

   onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.SessionForm.invalid) {
        return;
    }
    const DateDebut = this.SessionForm.value.date_debut;
    const myDateDebut = new Date(DateDebut.year, DateDebut.month - 1, DateDebut.day);
    const valueDateDebut = moment(myDateDebut).format('YYYY-MM-DD');
    // date fin
    const courDuree = this.cours.filter(cour => {
      return cour.ref_form === this.SessionForm.value.ref_formation });
    const duree = courDuree[0].duree;
    const convertduree: number = +duree - 1;
    myDateDebut.setDate(myDateDebut.getDate() + convertduree);
    const newDateFin = moment(myDateDebut).format('YYYY-MM-DD');
    const session = {
      ref_formation: this.SessionForm.value.ref_formation,
      date_debut: valueDateDebut,
      date_fin: newDateFin,
      type: this.SessionForm.value.type,
      langue: this.SessionForm.value.langue,
      lieu: this.SessionForm.value.lieu,
      address: this.SessionForm.value.address,
      etat_session: this.SessionForm.value.etat_session
    };
    this.sessionService.updateSession(this.id, session).subscribe((resp: any) => {
      if (!resp.success) {
        this.toastr.error("Error", resp.error);
      } else {
        this.toastr.success("Session updated","Success");
        this.router.navigate(["/admin/session/list-session"]);
      }
    });
  }
    fetchCours() {
    this.coursService.getAllCours().subscribe((data: any) => {
      this.cours = data.results
    });
   }

}
