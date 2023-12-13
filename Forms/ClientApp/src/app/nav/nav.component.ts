import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @Output() sideNavToggled = new EventEmitter<boolean>();
  @Output() searchEvent = new EventEmitter<string>();

  menuStatus: boolean = false;
  search: string = '';

  constructor(private auth: AuthService, private router: Router) { }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut() {
    this.auth.removeToken();
    this.router.navigateByUrl('/signin');
  }
  sideNavToggle() {
    this.menuStatus =  !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);

  }

  nav() {
    this.router.navigateByUrl("signin/profile");
  }

  searchh(par) {
    console.log(par);
    this.search=par
    this.searchEvent.emit(this.search)
  }

}
