import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({name: 'angularinputkeephtml', pure: false})
export class EscapeHtmlPipe implements PipeTransform {
  constructor(public sanitizer: DomSanitizer) {
  }

  transform(content): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
