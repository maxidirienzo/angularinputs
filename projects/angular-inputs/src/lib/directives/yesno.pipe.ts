import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'angularinputyesno'})
export class YesNoPipe implements PipeTransform {
  transform(value: any): string {
    value = (value == 1 ? true : (value === true) ? true : false);
    if (value) {
      return '<span class=\'angularinput-yesno-yes\'><span class=\'fa fa-check-circle\'></span> SI</span>';
    } else {
      return '<span class=\'angularinput-yesno-no\'><span class=\'fa fa-times-circle\'></span> No</span>';
    }
  }
}
