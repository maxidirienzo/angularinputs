import {Injectable} from '@angular/core';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbDateISOStringAdapter extends NgbDateAdapter<string> {
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

  /**
   * Converts a NgbDateStruct value into string value
   */
  fromModel(date: string | null): NgbDateStruct | null {
    if (date === null || (typeof date === 'undefined')) {
      return null;
    }

    // remove hours if present
    if (date.length > 10) {
      date = date.substr(0, 10);
    }
    const dateParts = date.trim().split('-');
    if (dateParts.length === 3) {
      return {year: this.toInteger(dateParts[0]), month: this.toInteger(dateParts[1]), day: this.toInteger(dateParts[2])};
    } else {
      return null;
    }
  }

  /**
   * Converts a string value into NgbDateStruct value
   */
  toModel(date: NgbDateStruct | null): string | null {
    if (date == null) {
      return null;
    } else {
      return '' + date.year + '-' + this.padNumber(date.month) + '-' + this.padNumber(date.day);
    }
  }
}
