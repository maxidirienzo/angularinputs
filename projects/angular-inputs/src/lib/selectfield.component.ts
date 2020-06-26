import {Component, Input, ViewChild, forwardRef, HostBinding, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AngularInputsIdLabel} from './angular-input-classes';


@Component({
  selector: 'select-field',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true
    }
  ],
  template: `
    <div class="angularinput form-group"
         [ngClass]="{ 'has-error': required && submitted && ( (modelValue === '') || (!modelValue && (modelValue !== 0) && (modelValue !== '0')) || (modelValue === null) ) }">
      <label *ngIf="!hidelabel"><span class="angularinput-label-required" *ngIf="required">* </span>{{title}}</label>
      <select
        class="form-control"
        #formcontrolcomponent="ngModel"
        [name]="name"
        [(ngModel)]="modelValue"
        (ngModelChange)="updateChanges()"
        [disabled]="disabled"
        [required]="required"
      >

        <option [ngValue]="nullval">{{placeholder}}</option>
        <option *ngFor="let item of options" [ngValue]="item.id">{{item.l}}</option>
      </select>
    </div>
  `
})

export class SelectFieldComponent implements ControlValueAccessor, OnInit {
  public modelValue: any;
  public nullval = null;

  @ViewChild('formcontrolcomponent', {static: true}) formcontrolcomponent;

  @HostBinding('class')
  @Input()
  hostClass: string;

  @Input() cols: number;
  @Input() hidelabel: boolean;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() submitted: boolean;
  @Input() title: string;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() options: AngularInputsIdLabel[];

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
