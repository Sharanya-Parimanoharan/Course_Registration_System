import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../login/ResetPassword';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  baseUrl = 'https://localhost:7118/api/Student';
  constructor(private http: HttpClient) { }

  sendResetpasswordLink(email: string) {
   return this.http.post(`${this.baseUrl}/send-reset-email/${email}`, {

    })
  }

  resetPassword(resetPass: ResetPassword) {
    return this.http.post(`${this.baseUrl}/reset-email`, resetPass);
  }
}
