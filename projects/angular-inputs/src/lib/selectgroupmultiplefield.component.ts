import {Component, Input, ViewChild, forwardRef, HostBinding, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AngularInputsIdLabelGroup} from './angular-input-classes';

@Component({
  selector: 'select-field-group-multiple',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectGroupMultiFieldComponent),
      multi: true
    }
  ],
  template: `
    <div class="angularinput form-group"
         [ngClass]="{ 'has-error': required && submitted && ( (modelValue === '') || (!modelValue) || (modelValue === null) ) }">
      <label *ngIf="!hidelabel"><span class="angularinput-label-required" *ngIf="required">* </span>{{title}}</label>
      <select
        class="form-control select-multi"
        #formcontrolcomponent="ngModel"
        multiple="multiple"
        [size]="size||5"
        [name]="name"
        [(ngModel)]="modelValue"
        (ngModelChange)="updateChanges()"
        [disabled]="disabled"
        [required]="required"
      >

        <optgroup *ngFor="let item of options" [label]="item.l">
          <option *ngFor="let option of item.g" [ngValue]="option.id">{{option.l}}</option>
        </optgroup>
      </select>
    </div>
  `
})

export class SelectGroupMultiFieldComponent implements ControlValueAccessor, OnInit {
  public modelValue: any;

  @ViewChild('formcontrolcomponent', {static: true}) formcontrolcomponent;

  @HostBinding('class')
  @Input()
  hostClass: string;

  @Input() cols: number;
  @Input() size: number;
  @Input() hidelabel: boolean;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() submitted: boolean;
  @Input() title: string;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() options: AngularInputsIdLabelGroup[];

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
