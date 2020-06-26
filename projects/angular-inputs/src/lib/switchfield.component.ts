import {Component, Input, forwardRef, HostBinding, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'switch-field',
  styleUrls: ['./switchfield.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchFieldComponent),
      multi: true
    }
  ],
  template: `
    <div class="angularinput form-group">
      <label *ngIf="!hidelabel">{{title}}</label>
      <div class="mt-2">
        <ui-switch color="#337ab7" size="small" [(ngModel)]="modelValue" [ngModelOptions]="{standalone: true}"
                   (ngModelChange)="updateChanges()"></ui-switch>
        <span class="ui-switch-yesno" [innerHTML]="modelValue|angularinputyesno|angularinputkeephtml"></span>
      </div>
    </div>
  `
})

export class SwitchFieldComponent implements ControlValueAccessor, OnInit {
  public modelValue: any;

  @HostBinding('class')
  @Input()
  hostClass: string;

  @Input() cols: number;
  @Input() hidelabel: boolean;
  @Input() title: string;

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
    return true;
  }
}
