import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormateurService } from 'src/app/admin/services/formateur.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-show-formateur',
  templateUrl: './show-formateur.component.html',
  styleUrls: ['./show-formateur.component.css']
})
export class ShowFormateurComponent implements OnInit {
  id;
 Result ;
 allCertif;
 allCv;
  constructor(
    private toastr: ToastrService,
    private formateurService: FormateurService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.fetchFormateur(this.id);
    this.fetchCertifFormateur(this.id);
    this.fetchCvFormateur(this.id);
  }
  changePassword(){
    this.formateurService.changePassword(this.Result.id, this.Result.email).subscribe((resp: any) => {
      if (!resp.success) {
        this.toastr.error('Error', resp.error);
      } else {
        this.toastr.success('Password Changed', 'Success');
      }
    });
  }
   fetchFormateur(id){
    this.formateurService.getFormateurById(id).subscribe((resp: any) => {
      this.Result = resp.result[0];
    });
   }
   fetchCertifFormateur(id){
    this.formateurService.getAllFormateurCertifById(id).subscribe((resp: any) => {
      this.allCertif = resp.result;
    });
   }
   fetchCvFormateur(id){
    this.formateurService.getAllFormateurCvById(id).subscribe((resp: any) => {
      this.allCv = resp.result;
    });
   }
   downloadCertif(name){
    this.formateurService.downloadCertifById(name).subscribe((resp: any) => {
      const file: Blob = new Blob([resp], {type: resp.type}); // replace the type by whatever type is your response

      const blob = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = blob;
      link.download = name;
      link.click();

    });
   }
   downloadCv(name){
    this.formateurService.downloadCvById(name).subscribe((resp: any) => {
      const fileCv: Blob = new Blob([resp], {type: resp.type}); // replace the type by whatever type is your response

      const blobCV = window.URL.createObjectURL(fileCv);
      const linkCV = document.createElement('a');
      linkCV.href = blobCV;
      linkCV.download = name;
      linkCV.click();
    });
  }
}
