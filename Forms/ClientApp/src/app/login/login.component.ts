import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isUserValid: boolean = false;
  ress: any;

  ngOnInit() {

  }
  constructor(private authService: AuthService, private router: Router) { }

  loginfrm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [Validators.required])
  });

  get email() {
    return this.loginfrm.get("email");
  }

  get pwd() {
    return this.loginfrm.get("pwd");
  }

 

  loginSubmit() {
    this.authService.loginStudent([
      this.loginfrm.value.email,
      this.loginfrm.value.pwd
    ]).subscribe(res => {
      if (res == "Failure") {
        this.isUserValid = false;
        alert("Login unsuccessful");
          
      }
      else {
        this.isUserValid = true;
        this.authService.setToken(res);
        this.ress =this.authService.loadCurrentUser();
        if (this.ress.role == "Admin") {
          this.router.navigateByUrl('/signin/courses');
        }
      }
    }); 
   
  }
}
