import {Component, Input, ViewChild, forwardRef, HostBinding, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'input-date-field',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    }
  ],
  template: `
    <div class="angularinput form-group"
         [ngClass]="{ 'has-error': required && submitted && ( (modelValue === '') || (!modelValue) || (modelValue === null) ) }">
      <label *ngIf="!hidelabel"><span class="angularinput-label-required" *ngIf="required">* </span>{{title}}</label>
      <div class="input-group">
        <input
          type="{{type || 'text'}}"
          ngbDatepicker
          class="form-control"
          #formcontrolcomponent="ngModel"
          #d="ngbDatepicker"
          [minDate]="{year:1930, month:1,day:1}"
          [name]="name"
          [(ngModel)]="modelValue"
          (ngModelChange)="updateChanges()"
          [ngModelOptions]="{updateOn: blur?'blur':'change'}"
          [disabled]="disabled"
          [required]="required"
          maxlength="10"
          (click)="d.toggle()"
          placeholder="{{placeholder}}"
        />

        <div class="input-group-append">
          <button class="btn" (click)="d.toggle()" type="button"><span class="fa fa-calendar"></span></button>
        </div>
      </div>
    </div>
  `
})

export class InputDateComponent implements ControlValueAccessor, OnInit {
  public modelValue: any;

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
  @Input() blur: boolean;

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

  isvalid(): boolean {
    return this.submitted ? !this.formcontrolcomponent.invalid : true;
  }
}
