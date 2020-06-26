import {Component, Input, ViewChild, forwardRef, HostBinding, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'html-field',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HtmlFieldComponent),
      multi: true
    }
  ],
  template: `
    <div class="angularinput form-group"
         [ngClass]="{ 'has-error': required && submitted && ( (modelValue === '') || (!modelValue) || (modelValue === null) ) }">
      <label *ngIf="!hidelabel"><span class="angularinput-label-required" *ngIf="required">* </span>{{title}}</label>

      <editor
        #formcontrolcomponent="ngModel"
        [name]="name"
        [(ngModel)]="modelValue"
        (ngModelChange)="updateChanges()"
        [ngModelOptions]="{updateOn: blur?'blur':'change'}"
        [init]="tinyHtmlOptions || tinyHtmlOptionsDefaults"
      ></editor>
    </div>
  `
})

export class HtmlFieldComponent implements ControlValueAccessor, OnInit {
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
  @Input() title: string;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() blur: boolean;
  @Input() height: number;
  @Input() tinyHtmlOptions: any;

  public tinyHtmlOptionsDefaults = {
    height: this.height || 350,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code wordcount'
    ],
    toolbar: 'undo redo | formatselect | bold italic link image visualblocks | alignleft aligncenter alignright alignjustify | bullist numlist table outdent indent | removeformat code fullscreen'
  };

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
