import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let now = new Date();

    let diffInDays = Math.floor((now.getTime() - new Date(value).getTime()) / (1000 * 60 * 60 * 24));
    let diffInHours = Math.floor((now.getTime() - new Date(value).getTime()) / (1000 * 60 * 60));
    let diffInMinutes = Math.floor((now.getTime() - new Date(value).getTime()) / (1000 * 60));
    
    if (diffInDays === 0) {
      if (diffInHours === 0) {
        if (diffInMinutes === 0) {
          return "Just now";
        } else {
          return diffInMinutes + " Minutes ago";
        }
      } else {
        return diffInHours + " Hours ago";
      }
    } else if (diffInDays === 1) {
      return diffInDays + " Day ago";
    } else if (diffInDays <= 7) {
      return diffInDays + " Days ago";
    } else if (diffInDays <= 365) {
      return Math.floor(diffInDays / 7) + " Weeks ago";
    } else {
      let datePipe = new DatePipe('en-US');
      return datePipe.transform(value, 'dd-MM-yyyy');
    }
  }
}
