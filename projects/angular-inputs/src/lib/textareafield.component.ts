import {Component, Input, ViewChild, forwardRef, HostBinding, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'textarea-field',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaFieldComponent),
      multi: true
    }
  ],
  template: `
    <div class="angularinput form-group"
         [ngClass]="{ 'has-error': required && submitted && ( (modelValue === '') || (!modelValue) || (modelValue === null) ) }">
      <label *ngIf="!hidelabel"><span class="angularinput-label-required" *ngIf="required">* </span>{{title}}</label>
      <textarea
        class="form-control"
        #formcontrolcomponent="ngModel"
        [name]="name"
        [(ngModel)]="modelValue"
        (ngModelChange)="updateChanges()"
        [ngModelOptions]="{updateOn: blur?'blur':'change'}"
        [disabled]="disabled"
        [required]="required"
        [rows]="rows || 3"
        placeholder="{{placeholder}}"></textarea>
    </div>
  `
})

export class TextareaFieldComponent implements ControlValueAccessor, OnInit {
  public modelValue: any;

  @ViewChild('formcontrolcomponent', {static: true}) formcontrolcomponent;

  @Input() cols: number;
  @Input() hidelabel: boolean;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() submitted: boolean;
  @Input() title: string;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() blur: boolean;
  @Input() rows: number;

  @HostBinding('class')
  @Input()
  hostClass: string;


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
