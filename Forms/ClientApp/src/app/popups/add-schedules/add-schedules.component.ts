import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { CustomTimePipe } from '../../custom-time.pipe';
import { CourseService } from '../../services/course.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-schedules',
 
  templateUrl: './add-schedules.component.html',
  styleUrl: './add-schedules.component.css'
})
export class AddSchedulesComponent {
  constructor(private serv: CourseService, private dialog: MatDialog) { }
  formattedTime: any;

  Schedules = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    day: new FormControl('', Validators.required),
    sTime: new FormControl('', Validators.required),
    eTime: new FormControl('', Validators.required),
    capacity: new FormControl('', Validators.required),
    deadLine: new FormControl('', Validators.required),
  });

  get name() {
    return this.Schedules.get('name') as FormControl;
  }
  get code() {
    return this.Schedules.get('code') as FormControl;
  }
  get day() {
    return this.Schedules.get('day') as FormControl;
  }
  get sTime() {
    return this.Schedules.get('sTime') as FormControl;
  }
  get eTime() {
    return this.Schedules.get('eTime') as FormControl;
  }
  get capacity() {
    return this.Schedules.get('capacity') as FormControl;
  }
  get deadLine() {
    return this.Schedules.get('deadLine') as FormControl;
  }



  addSchedules() {
    this.Schedules.value.sTime = this.Schedules.value.sTime + ":00";
    this.Schedules.value.eTime = this.Schedules.value.eTime + ":00";
    this.Schedules.value.deadLine = this.Schedules.value.deadLine + ":00";

    console.log(this.Schedules.value.deadLine);
    

      this.serv.addSchedules([
      this.Schedules.value.name,
      this.Schedules.value.code,
      this.Schedules.value.day,
      this.Schedules.value.sTime,
      this.Schedules.value.eTime,
        this.Schedules.value.capacity,
        this.Schedules.value.deadLine,

    ]).subscribe(res => {
      if (res == "Success") {
        alert("Successfully added !");
        this.dialog.closeAll();
        if (window.location.href == "http://localhost:4200/signin/schedules") {
          window.location.reload();
        }
      }
      else {
        alert("Error!!");
        this.dialog.closeAll();
        if (window.location.href == "http://localhost:4200/signin/schedules") {
          window.location.reload();
        }

      }
      
    });

  }
}
