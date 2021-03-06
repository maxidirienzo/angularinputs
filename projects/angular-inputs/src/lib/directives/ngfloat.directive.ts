import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[angularinputngfloat]'
})
export class NgfloatDirective {

  constructor(public el: ElementRef) {
  }

  @HostListener('keydown', ['$event']) onKeyDown(event): void {
    if (((event.keyCode >= 48) && (event.keyCode <= 57)) || ((event.keyCode >= 96) && (event.keyCode <= 105)) || (event.keyCode == 9) || (event.keyCode == 0) || (event.keyCode == 35) || (event.keyCode == 36) || (event.keyCode == 37) || (event.keyCode == 39) || (event.keyCode == 46) || (event.keyCode == 8) || (event.keyCode == 110) || (event.keyCode == 190)) {
      return;
    } else {
      event.preventDefault();
    }
  }
}
