import {Injectable} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbDateDMYParserFormatter extends NgbDateParserFormatter {
  padNumber(value: number): string {
    if (this.isNumber(value)) {
      return `0${value}`.slice(-2);
    } else {
      return '';
    }
  }

  isNumber(value: any): boolean {
    return !isNaN(this.toInteger(value));
  }

  toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  parse(value: string): NgbDateStruct { // parse receive your string dd/mm/yyy
    const dateParts = value.trim().split('/');
    if (dateParts.length === 3) {
      return {year: this.toInteger(dateParts[2]), month: this.toInteger(dateParts[1]), day: this.toInteger(dateParts[0])};
    } else {
      return null;
    }
  }

  format(date: NgbDateStruct): string { // receive a NgbDateStruct
    if (date == null) {
      return '';
    } else {
      return '' + this.padNumber(date.day) + '/' + this.padNumber(date.month) + '/' + date.year;
    }
  }
}
