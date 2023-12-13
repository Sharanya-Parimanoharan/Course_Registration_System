import {
  Component, OnInit, Input
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCoursesComponent } from '../popups/add-courses/add-courses.component';
import { AddSchedulesComponent } from '../popups/add-schedules/add-schedules.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input() sideNavStatus: boolean = false;
  list = [
    {
      number: '1',
      name: 'Add Courses',
      icon: "fa-solid fa-book",
    },
    {
      number: '2',
      name: 'Add Schedules',
      icon: "fa-regular fa-calendar-plus",
    },
    {
      number: '3',
      name: 'View Courses',
      icon: "fa-regular fa-eye",
      //path:'signin/courses'
    },
    {
      number: '4',
      name: 'View Schedules',
      icon:"fa-solid fa-calendar-days"
    },
    {
      number: '5',
      name: 'Registered Students',
      icon:"fa-solid fa-people-group"
    },
  ];

  constructor(private dialog: MatDialog,private router :Router) { }

  ngOnInit(): void {

  }

  openDialog(name: string) {
    if (name == 'Add Courses') {
      this.dialog.open(AddCoursesComponent, {
        width: '250px',
        data: "right click"
      });
    
    }
    if (name == 'Add Schedules') {
      this.dialog.open(AddSchedulesComponent, {
        width: '550px',
        data: "right click"
      });
    }
    if (name == 'View Courses') {
      this.router.navigateByUrl('signin/courses');
    }
    if (name == 'View Schedules') {
      this.router.navigateByUrl('signin/schedules');
    }

  }
}
