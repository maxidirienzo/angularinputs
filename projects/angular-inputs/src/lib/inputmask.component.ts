import {Component, Input, ViewChild, forwardRef, HostBinding, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'input-mask-field',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskComponent),
      multi: true
    }
  ],
  template: `
    <div class="angularinput form-group"
         [ngClass]="{ 'has-error': required && submitted && ( (modelValue === '') || (!modelValue) || (modelValue === null) ) }">
      <label *ngIf="!hidelabel"><span class="angularinput-label-required" *ngIf="required">* </span>{{title}}</label>
      <input
        type="{{type || 'text'}}"
        class="form-control"
        [textMask]="{mask:getMask()}"
        #formcontrolcomponent="ngModel"
        [name]="name"
        [(ngModel)]="modelValue"
        (ngModelChange)="updateChanges()"
        [disabled]="disabled"
        [required]="required"
        placeholder="{{placeholder}}"/>
    </div>
  `
})

export class InputMaskComponent implements ControlValueAccessor, OnInit {
  public convertedMask: Array<any> = null;
  public modelValue: any;
  public maskValue: string = null;

  @ViewChild('formcontrolcomponent', {static: true}) formcontrolcomponent;

  @HostBinding('class')
  @Input()
  hostClass: string;

  @Input() cols: number;
  @Input() hidelabel: boolean;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() submitted: boolean;
  @Input() type: string;
  @Input() title: string;
  @Input() placeholder: string;
  @Input() name: string;

  @Input()
  get mask(): string {
    return this.maskValue;
  }

  set mask(s: string) {
    this.maskValue = s;
    this.convertedMask = null;
  }

  ngOnInit(): void {
    this.hostClass = 'col-' + (this.cols || '12');
  }

  writeValue(value: any): void {
    this.modelValue = value;
    this.updateChanges();
  }

  /**
   * Invoked when the model has been changed
   */
  onChange: (_: any) => void = (_: any) => {
  }

  /**
   * Invoked when the model has been touched
   */
  onTouched: () => void = () => {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateChanges(): void {
    this.onChange(this.modelValue);
  }

  getMask() {
    if (typeof this.maskValue === 'undefined') {
      return [];
    }
    if (this.maskValue === null) {
      return [];
    }
    if (Array.isArray(this.maskValue)) {
      return this.maskValue;
    }

    if (this.convertedMask === null) {
      let tmp: any[] = this.maskValue.split('');
      tmp.forEach(function(item, index) {
        if (item == '9') {
          tmp[index] = /[0-9]/;
        }
      });
      this.convertedMask = tmp;
    }
    return this.convertedMask;
  }

  isvalid(): boolean {
    return this.submitted ? !this.formcontrolcomponent.invalid : true;
  }
}
