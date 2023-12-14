import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DatePipe, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {
  obj: any;
  sideNavStatus: boolean = false;
  hide = true;
  repeatPass = "none";
  originalDate: any;
  formatted: any;

  constructor(private serv: AuthService, private datePipe: DatePipe, private location: Location) { }

  firstFormGroup = new FormGroup({
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    nic: new FormControl("", Validators.required),
    mobile: new FormControl("", Validators.required),
    member: new FormControl("", Validators.required),


  });


  secondFormGroup = new FormGroup({
    pwd: new FormControl(""),
    rpwd:new FormControl("")
  });
  isLinear = false;

  get pwd() {
    return this.secondFormGroup.get("pwd");
  }
  get rpwd() {
    return this.secondFormGroup.get("rpwd");
  }

  ngOnInit() {
    this.obj = this.serv.loadCurrentUser();
    console.log(this.obj.role);

    this.firstFormGroup.value.firstname = this.obj.firstname;
    this.firstFormGroup.value.lastname = this.obj.lastname;
    this.firstFormGroup.value.email = this.obj.email;
    this.firstFormGroup.value.mobile =this. obj.mobile;
    this.firstFormGroup.value.nic = this.obj.id;
    this.firstFormGroup.value.member = this.obj.member;
  }

  sendUpdate() {
    this.originalDate = new Date(this.obj.member);
    this.formatted = this.datePipe.transform(this.originalDate, 'yyyy-MM-ddTHH:mm:ss.SSSSSSS');
    this.serv.updateStudent([
      this.firstFormGroup.value.firstname,
      this.firstFormGroup.value.lastname,
      this.firstFormGroup.value.email,
      this.firstFormGroup.value.nic,
      this.firstFormGroup.value.mobile,
      this.formatted,
      this.secondFormGroup.value.pwd,
      this.obj.role,
      this.obj.degree
    ]).subscribe(res => {
      if (res == 'Success') {
        alert("Updated Successfully !!");
      }
      else {
        alert("Error!!");
      }
    });
  }

  cancel() {
    this.ngOnInit();
  }

  RepeatPassCheck() {
    if (this.pwd.value == this.rpwd.value) {
      this.repeatPass = 'none';
      this.sendUpdate();
    }
    else {
      this.repeatPass = 'inLine';
    }
  }

  close() {
    this.location.back();
  }

}

