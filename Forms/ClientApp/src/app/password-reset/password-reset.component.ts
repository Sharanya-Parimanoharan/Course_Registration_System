import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ResetPassword } from '../login/ResetPassword';
import { AuthService } from '../services/auth.service';
import { ResetPasswordService } from '../services/reset-password.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {

  repeatPass: string = "none";
  displayMsg: string = '';
  emailToken: string;
  emailToReset: string;

  resetPasswordObj = new ResetPassword();


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(val => {
      this.emailToReset = val['email'];
      let uriToken = val['code'];

      this.emailToken = uriToken.replace(/ /g, '+');
    })
  }
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private resetserv: ResetPasswordService) { }

  resetPasswd = new FormGroup({
    pwd: new FormControl('', [Validators.required]),
    rpwd: new FormControl('', [Validators.required])
  });

  get rpwd() {
    return this.resetPasswd.get("rpwd");
  }

  get pwd() {
    return this.resetPasswd.get("pwd");
  }



  reset() {
    if (this.pwd.value == this.rpwd.value) {
      this.repeatPass = "none";
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswd.value.pwd;
      this.resetPasswordObj.confirmPassword = this.resetPasswd.value.rpwd;
      this.resetPasswordObj.emailToken = this.emailToken;
      console.log(this.resetPasswordObj);
      this.resetserv.resetPassword(this.resetPasswordObj).subscribe(res => {
        if (res == 'Password Reset Successfully') {
          alert("Successfully Updated!!");
        }
        if (res == 'Invalid Reset Link') {
          alert("Invalid Reset Link");
        }
        else {
          alert("Something went wrong!");
        }
      }
      )
    }
    else {
      this.repeatPass = 'inline';
    }

  }



}


