import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:7118/api/';

  addCourse(course: Array<string>) {
    return this.http.post(this.baseUrl + "Courses/send", {
      name: course[0],
      code: course[1],
      preRequirements: course[2],
      department: course[3],
      CourseSchedule: []

    }, {
      responseType: 'text',
    });
    
  }

  getCourses() {
    return this.http.get(this.baseUrl + "Courses/get");
     
  }

  deleteCourse(code: string) {
    return this.http.delete(this.baseUrl + `Courses/delete/${code}`, {
      responseType: 'text',
    });
  }

  update(course: Array<string>) {
    console.log(course);
    return this.http.put(this.baseUrl + `Courses/${course[1]}`, {
      name: course[0],
      code: course[1],
      preRequirements: course[2],
      department: course[3],
      CourseSchedule:[]
    }, {
      responseType: 'text'
    });
  }


  addSchedules(schedules: Array<string>) {
    return this.http.post(this.baseUrl + "Schedules/send", {
      instructor: schedules[0],
      CourseId: schedules[1],
      year: schedules[2],
      startTIme: schedules[3],
      endTIme: schedules[4],
      maxCapacity: schedules[5],
      deadLine: schedules[6],
      currentEnrollment: 0,
      CourseSchedules: []

    }, {
      responseType: 'text',
    });

  }

  getSchedules() {
    return this.http.get(this.baseUrl + "Schedules/get");

  }

  updateSchedule(schedule: Array<string>) {
    return this.http.put(this.baseUrl + `Schedules/${schedule[8]}`, {
      instructor: schedule[0],
      courseId: schedule[1],
      startTIme: schedule[2],
      endTIme: schedule[3],
      deadLine: schedule[4],
      maxCapacity: schedule[5],
      currentEnrollment: schedule[6],
      year: schedule[7],
      scheduleId: schedule[8],
      CourseSchedules: []
    }, {
      responseType: 'text'
    });
  }

  deleteSchedule(code: any) {
    return this.http.delete(this.baseUrl + `Schedules/delete/${code}`, {
      responseType: 'text',
    });
  }

}
