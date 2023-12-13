import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  obj: any;
  data: any;

  search(value: string,data:any) {
    value = value.toLowerCase();
    if (value.length > 0) {
      this.data = this.data.filter((d) => {
        d.Student = d.Student.filter((student) =>
          Student.name.toLowerCase().include(value) ||
          Student.instructor.toLowerCase().include(value)};

      return d.Student.length > 0;
    });

      
    }
  }
}
