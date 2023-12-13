import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTime',
})
export class CustomTimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;

  }

}
