import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Behavior } from 'popper.js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:7118/api/';
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);


  jwtHelperService = new JwtHelperService();

  registerStudent(student: Array<string>) {
    return this.http.post(this.baseUrl + 'Student/send', {
      firstname: student[0],
      lastname: student[1],
      email: student[2],
      mobile: student[3],
      pwd: student[4],
      degree: student[5],
      Studentid: student[6],
      role:"User"
    }, {
      responseType:'text',
    });
  }
  
  updateStudent(student: Array<string>) {
    console.log(student);

    return this.http.put(this.baseUrl+`Student/send/${student[3]}`,{
        firstname: student[0],
        lastname: student[1],
        email: student[2],
        Studentid: student[3],
        mobile: student[4],
        memberSince:student[5],
        pwd: student[6],
        role: student[7],
        degree: student[8]
      }, {
        responseType: 'text',
      });
  }


  
 

  loginStudent(loginInfo: Array<string>) {
    return this.http.post(this.baseUrl + 'Student/loginUser', {
      email: loginInfo[0],
      pwd: loginInfo[1]
    }, {
      responseType: 'text',
    });
  }
  loadCurrentUser() {
    const tokenn = localStorage.getItem("access_token");
    const userInfo = tokenn != null ? this.jwtHelperService.decodeToken(tokenn) : null;
    console.log(userInfo);
    return userInfo;
  }

  setToken(token: string) {
    localStorage.setItem("access_token", token);
    this.loadCurrentUser();
  }
  isLoggedIn(): boolean{
    return localStorage.getItem("access_token") ? true : false;
  }

  removeToken() {
    localStorage.removeItem("access_token");
  }

}
