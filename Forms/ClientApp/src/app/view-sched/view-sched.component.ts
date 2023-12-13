import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CourseService } from '../services/course.service';
@Component({
  selector: 'app-view-sched',

  templateUrl: './view-sched.component.html',
  styleUrl: './view-sched.component.css'
})
export class ViewSchedComponent implements OnInit {
  schedule: any;
  sideNavStatus: boolean = false;
  displayedColumns: string[] = ['code','instructor', 'day','stime','etime','max','current','deadLine', 'delete', 'update'];
  constructor(private serv: CourseService) { }

  frm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    stime: new FormControl(''),
    etime: new FormControl(''),
    day: new FormControl(''),
    deadLine: new FormControl(''),
    max: new FormControl(),
    registered: new FormControl(),
    sched: new FormControl()
  });

  ngOnInit() {
    this.serv.getSchedules().subscribe((res) => {
      this.schedule = res;
    });
  }

  delete(code: string) {
    if (confirm("Are you sure to delete this Schedule ?")) {
      this.serv.deleteSchedule(code).subscribe(res => {
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

  onEdit(schedule: any) {
    this.schedule.forEach(e => {
      e.isEdit = false;
    });
    schedule.isEdit = true;
  }

  save(schedules: any) {
    if (confirm("Are you sure to make changes ?")) {
      this.frm.value.code = schedules.courseId;
      this.frm.value.name = schedules.instructor;
      this.frm.value.stime = schedules.startTIme;
      this.frm.value.etime = schedules.endTIme;
      this.frm.value.deadLine = schedules.deadLine;
      this.frm.value.max = schedules.maxCapacity;
      this.frm.value.registered = schedules.currentEnrollment;
      this.frm.value.day = schedules.year;
      this.frm.value.sched = schedules.scheduleId;
      this.serv.updateSchedule([
        this.frm.value.name,
        this.frm.value.code,
        this.frm.value.stime,
        this.frm.value.etime,
        this.frm.value.deadLine,
        this.frm.value.max,
        this.frm.value.registered,
        this.frm.value.day,
        this.frm.value.sched,
      ]).subscribe(res => {
        if (res == 'Success') {
          alert("Successfully Updated !");
          schedules.isEdit = false;
        }
        else {
          alert("Error!!");
          schedules.isEdit = false;

        }
      });
    }
  }
  cancel(courses: any) {
    courses.isEdit = false;
  }

}
