import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-view-courses',

  templateUrl: './view-courses.component.html',
  styleUrl: './view-courses.component.css'
})
export class ViewCoursesComponent implements OnInit {
  courses: any;
  sideNavStatus: boolean = false;
  displayedColumns: string[] = ['code', 'name', 'dept', 'pre','delete','update'];
  constructor(private serv: CourseService) { }

  frm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    dept: new FormControl(''),
    pre: new FormControl('')
  });

  ngOnInit() {
    this.serv.getCourses().subscribe((res) => {
      this.courses = res;
    });
  }

  delete(code: string) {
    if (confirm("Are you sure to delete " + code)) {
      this.serv.deleteCourse(code).subscribe(res => {
        if (res == 'Success') {
          alert("Successfully deleted");
          this.ngOnInit();
        }
        else {
          alert("ERROR!!")
        }
        
      })

    }
  }

  onEdit(courses: any) {
    this.courses.forEach(e => {
      e.isEdit = false;
    });
    courses.isEdit = true;
  }

  save(courses: any) { 
    if (confirm("Are you sure to make changes ?")) {
      console.log(courses.code);
      this.frm.value.code = courses.code;
      this.frm.value.name = courses.name;
      this.frm.value.dept = courses.department;
      this.frm.value.pre = courses.preRequirements;

      this.serv.update([
        this.frm.value.name,
        this.frm.value.code,
        this.frm.value.pre,
        this.frm.value.dept
      ]).subscribe(res => {
        if (res == 'Success') {
          alert("Successfully Updated !");
          courses.isEdit = false;
        }
        else {
          alert("Error!!");
          courses.isEdit = false;

        }
      });
    }
  }
  cancel(courses:any) {
    courses.isEdit = false;
  }

}
