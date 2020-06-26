import {Component, Input, Output, EventEmitter, OnInit, forwardRef, HostBinding} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CropperDialogComponent} from './cropperdialog.component';

@Component({
  selector: 'cropper-field',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CropperComponent),
      multi: true
    }
  ],
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})

export class CropperComponent implements ControlValueAccessor, OnInit {

  public modelValue: any;
  public errorMessage = '';

  // URL of the preview image
  @Input() displayUrl: string;

  // Input/Output full size image file name
  @Input() fullSize: any;
  @Output() fullSizeChange = new EventEmitter();

  // Object with extra param to be posted to the uploadUrl
  @Input() uploadParams: any;

  // Server uploadUrl
  @Input() uploadUrl: string;

  // Cropper image ratio, defaults to 1
  @Input() aspectRatio: number;

  // Whether to force maintain aspect ratio or if it's free ratio selection, defaults to true
  @Input() maintainAspectRatio: boolean;

  // Cropper minimum width and height, defaults to 150 each
  @Input() cropperMinHeight: number;
  @Input() cropperMinWidth: number;

  // Cropper image format, defaults to jpg
  @Input() imageFormat: string;
  @Input() cols: string;
  @Input() name: string;
  @Input() title: string;
  @Input() required: boolean;
  @Input() hidelabel: boolean;
  @Input() submitted: boolean;
  @Input() cleared: boolean;
  @Input() disabled: boolean;
  @Output() clearedChange = new EventEmitter();

  @Output() modelChange = new EventEmitter();


  @HostBinding('class')
  @Input()
  hostClass: string;

  constructor(
    public modalService: NgbModal
  ) {
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
  };

  /**
   * Invoked when the model has been touched
   */
  onTouched: () => void = () => {
  };

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
    return this.submitted ? (this.required && !this.modelValue) : true;
  }

  doSelect(): void {
    if (this.disabled) {
      return;
    }

    const modalRef = this.modalService.open(CropperDialogComponent, {centered: true, backdrop: 'static', size: 'lg'});
    modalRef.componentInstance.aspectRatio = this.aspectRatio || 1;
    modalRef.componentInstance.cropperMinHeight = this.cropperMinHeight || 150;
    modalRef.componentInstance.cropperMinWidth = this.cropperMinWidth || 150;
    modalRef.componentInstance.imageFormat = this.imageFormat || 'jpeg';
    modalRef.componentInstance.uploadUrl = this.uploadUrl;
    modalRef.componentInstance.uploadParams = this.uploadParams;
    modalRef.componentInstance.maintainAspectRatio = this.maintainAspectRatio;

    modalRef.componentInstance.title = this.title;
    modalRef.result.then((res) => {
      if (res !== false) {
        this.displayUrl = res.url_cropped;

        this.fullSize = res.file_original;
        this.modelValue = res.file_cropped;
        this.fullSizeChange.emit(this.fullSize);
        this.updateChanges();

      }
    }).catch(() => {
      this.clearUpload();
    });
  }

  clearUpload(): void {
    this.displayUrl = '';
    this.errorMessage = '';
    this.fullSize = '';
    this.modelValue = '';
    this.fullSizeChange.emit(this.fullSize);
    this.updateChanges();
    this.cleared = true;
    this.clearedChange.next(this.cleared);
  }
}
