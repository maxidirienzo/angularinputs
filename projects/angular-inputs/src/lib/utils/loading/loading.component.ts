import {Component, Input} from '@angular/core';

@Component({
  selector: 'angularinputs-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  @Input() small: boolean;
}
