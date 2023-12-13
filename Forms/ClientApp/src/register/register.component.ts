import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  repeatPass: string = "none";
  displayMsg: string = '';
  isAccountCreated: boolean = false;
  hide=true;
  constructor(private authService: AuthService) { }


  ngOnInit() {

  }

  registerfrm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    mobile: new FormControl('',[Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]*$'), Validators.required]),
    pwd: new FormControl('', [Validators.required]),
    rpwd: new FormControl('', [Validators.required]),
    studentid: new FormControl('', Validators.required),
    degree: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])


  });

  get firstname() {
    return this.registerfrm.get('firstname') as FormControl;
  }
  get lastname() {
    return this.registerfrm.get('lastname') as FormControl;
  }
  get mobile() {
    return this.registerfrm.get('mobile') as FormControl;
  }
  get pwd() {
    return this.registerfrm.get('pwd') as FormControl;
  }
  get rpwd() {
    return this.registerfrm.get('rpwd') as FormControl;
  }
  get degree() {
    return this.registerfrm.get('degree') as FormControl;
  }
  get studentid() {
    return this.registerfrm.get('studentid') as FormControl;
  }
  get email() {
    return this.registerfrm.get('email') as FormControl;
  }





  registerSubmit() {
    if (this.pwd.value == this.rpwd.value) {
      this.repeatPass = "none";

      this.authService.registerStudent([
        this.registerfrm.value.firstname,
        this.registerfrm.value.lastname,
        this.registerfrm.value.email,
        this.registerfrm.value.mobile,
        this.registerfrm.value.pwd,
        this.registerfrm.value.degree,
        this.registerfrm.value.studentid
      ]).subscribe(res => {
        if (res == 'Success') {
          this.displayMsg = 'Account Created Successfully';
          this.isAccountCreated = true;
        } else if (res == 'AlreadyExist') {
          this.displayMsg = 'Account Already Exist';
          this.isAccountCreated = false;
        } else {
          this.displayMsg = 'Something went wrong';
          this.isAccountCreated = false;
        }
      })
    }
    else {
      this.repeatPass = 'inline';
    }

  }


}
