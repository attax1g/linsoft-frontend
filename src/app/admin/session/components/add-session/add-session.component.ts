import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'src/app/admin/services/session.service';
import { CoursService } from 'src/app/admin/services/cours.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import countries from 'src/app/countries.json';
import { CategorieService } from 'src/app/admin/services/categorie.service';
@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.css']
})
export class AddSessionComponent implements OnInit {
  debut: NgbDateStruct;
  fin: NgbDateStruct;
  SessionForm: FormGroup;
  submitted = false;
  cours = [];
  testcours = [];
  filtercours = [];
  categories = [];
  title = 'json-file-read-angular';
  public countryList: { name: string, code: string }[] = countries;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private coursService: CoursService,
    private sessionService: SessionService,
    private categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    this.fetchCategorie();
    this.fetchCours();
    this.SessionForm = this.formBuilder.group({
    ref_formation: ['', [Validators.required]],
    cat_formation: ['', ],
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
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.SessionForm.invalid) {
        return;
    }
    const DateDebut = this.SessionForm.value.date_debut;
    const myDateDebut = new Date(DateDebut.year, DateDebut.month - 1, DateDebut.day);
    const valueDateDebut = moment(myDateDebut).format('YYYY-MM-DD');
    /*
    const DateFin = this.SessionForm.value.date_fin;
    const myDateFin = new Date(DateFin.year, DateFin.month - 1, DateFin.day);
    const valueDateFin = moment(myDateFin).format('YYYY-MM-DD');
    */
    const courDuree = this.cours.filter(cour => {
      return cour.ref_form === this.SessionForm.value.ref_formation;
    });
    const duree = courDuree[0].duree;
    const convertduree: number = +duree - 1;
    myDateDebut.setDate(myDateDebut.getDate() + convertduree);
    const newDateFin = moment(myDateDebut).format('YYYY-MM-DD');
    this.submitted = true;
    // stop here if form is invalid
    if (this.SessionForm.invalid) {
        return;
    }
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
    this.sessionService.saveSession(session).subscribe((resp: any) => {
      if (!resp.success) {
        this.toastr.error("Error", resp.error);
      } else {
        this.toastr.success("Session created","Success");
        this.router.navigate(["/admin/session/list-session"]);
      }
    });
}
   onchange(){
  this.filtercours = this.testcours.filter((cour: any) => {
    return cour.categorie === this.SessionForm.value.cat_formation;
  });
  this.cours = this.filtercours.map((cour: any) => {
    return cour;
  });

}
fetchCours(){
  this.coursService.getAllCours().subscribe((data: any) => {
    this.testcours = data.results;
    this.cours = data.results;
  });
 }
 fetchCategorie(){
  this.categorieService.getAllCategories().subscribe((data: any) => {
    this.categories = data.results;
  });
 }

}
