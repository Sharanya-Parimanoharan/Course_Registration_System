import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent {
  constructor(private serv: CourseService, private dialog: MatDialog) { }

  courses = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    pre: new FormControl(''),
    dept: new FormControl('', Validators.required)
  });

  get name() {
    return this.courses.get('name') as FormControl;
  }
  get code() {
    return this.courses.get('code') as FormControl;
  }
  get pre() {
    return this.courses.get('pre') as FormControl;
  }
  get dept() {
    return this.courses.get('dept') as FormControl;
  }

  addCourses() {
    this.serv.addCourse([
      this.courses.value.name,
      this.courses.value.code,
      this.courses.value.pre,
      this.courses.value.dept

    ]).subscribe(res => {
      if (res == "AlreadyExist") {
        alert("This course already exist !");
        this.dialog.closeAll();
        if (window.location.href == "http://localhost:4200/signin/courses") {
          window.location.reload();
        }

      }
      else {
        alert("Successfully added !");
        this.dialog.closeAll();
        if (window.location.href == "http://localhost:4200/signin/courses") {
          window.location.reload();
        }
      }
    });

  }
}
