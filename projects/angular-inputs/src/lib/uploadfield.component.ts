import {Component, Input, Output, EventEmitter, OnInit, ViewChild, forwardRef, HostBinding} from '@angular/core';
import {HttpClient, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

/**
 * Server must reply with 'filename' (actual image name to store) and 'image_url' (URL to the image) keys
 * ngModel: holds the file real name after selected, ofter unused
 * serverFilename: holds the actual file name in the server (use this to save into the DB)
 * serverUrl: holds the file URL in the server
 * uploadUrl: upload script URL
 */

@Component({
  selector: 'upload-field',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputUploadComponent),
      multi: true
    }
  ],
  templateUrl: './uploadfield.component.html',
})
export class InputUploadComponent implements ControlValueAccessor, OnInit {
  @ViewChild('filectr') filectr;
  @ViewChild('formcontrolcomponent') formcontrolcomponent;

  public processDone = 0;
  public uploading = false;
  public uploaded = false;
  public modelValue: any;
  public errorMessage = '';

  @Input() serverFilename: any;
  @Input() serverUrl: any;
  @Input() uploadparams: any;
  @Input() uploadUrl: string;
  @Input() accept: string;
  @Input() placeholder: string;
  @Input() cols: string;
  @Input() name: string;
  @Input() title: string;
  @Input() required: boolean;
  @Input() hidelabel: boolean;
  @Input() disabled: boolean;
  @Input() submitted: boolean;
  @Input() cleared: boolean;
  @Output() clearedChange = new EventEmitter();

  @Output() modelChange = new EventEmitter();
  @Output() serverFilenameChange = new EventEmitter();
  @Output() serverUrlChange = new EventEmitter();

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

  constructor(private http: HttpClient) {
  }

  doSelect(): void {
    this.filectr.nativeElement.click();
  }

  clearUpload(): void {
    this.errorMessage = '';
    this.serverFilename = '';
    this.serverUrl = '';
    this.modelValue = '';
    this.serverFilenameChange.emit(this.serverFilename);
    this.serverUrlChange.emit(this.serverUrl);
    this.updateChanges();
    this.uploading = false;
    this.uploaded = false;
    this.cleared = true;
    this.clearedChange.next(this.cleared);
  }

  showClear(): boolean {
    return this.modelValue && (this.modelValue !== '') && (this.modelValue !== null) && (this.modelValue !== undefined);
  }

  doUpload(): void {
    if (this.filectr.nativeElement.files.length != 1) {
      return;
    }

    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append('_file', this.filectr.nativeElement.files[0], this.filectr.nativeElement.files[0].name);

    // add extra params
    if ((typeof this.uploadparams !== 'undefined') && (this.uploadparams !== null)) {
      this.uploadparams!.forEach(function(v: any, ix: any) {		// null assertion operator !
        formData.append(ix, v, ix);
      });
    }

    // create a http-post request and pass the form
    // tell it to report the upload progress
    const req = new HttpRequest('POST', this.uploadUrl, formData, {reportProgress: true});

    this.errorMessage = '';
    this.processDone = 0;
    // setTimeout(() => {
    //   this.uploading = true;
    // }, 1);
    this.uploading = true;
    this.uploaded = false;

    // send the http-request and subscribe for progress-updates
    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {

        // calculate the progress percentage
        setTimeout(() => {
          this.processDone = Math.round(100 * event.loaded / event.total);
        }, 1);
      } else if (event instanceof HttpResponse) {

        if (event.body['success'] === false) {
          this.errorMessage = event.body['msg'];
        } else {
          this.modelValue = this.filectr.nativeElement.files[0].name;
          this.serverFilename = event.body['filename'];
          this.serverFilenameChange.emit(this.serverFilename);
          this.serverUrl = event.body['image_url'];
          this.serverUrlChange.emit(this.serverUrl);
          this.updateChanges();
        }

        this.processDone = 0;
        this.uploading = false;
        this.uploaded = true;
      } else {
        this.processDone = 0;
        this.uploading = false;
        this.uploaded = true;
      }
    }, (result) => {
      this.filectr.nativeElement.files[0].value = null;
      this.modelValue = '';
      this.serverFilename = '';
      this.serverFilenameChange.emit(this.serverFilename);
      this.serverUrl = '';
      this.serverUrlChange.emit(this.serverUrl);
      this.updateChanges();
      this.processDone = 0;
      this.uploading = false;
      this.uploaded = true;
      this.cleared = true;
      this.clearedChange.next(this.cleared);

      let msg = '';
      if (result.status === 500) {
        msg = 'Se ha producido un error al procesar su solicitud';
      }

      if (result.status === 422) {
        if (result.errors && result.errors._file && result.errors._file[0]) {
          msg = result.errors._file[0];
        }
        if (result.error) {
          if (result.error && result.error._e) {
            if (msg !== '') {
              msg = '\n' + msg;
            }
            msg = result.error._e + msg;
          }
          if (result.msg) {
            if (msg !== '') {
              msg = '\n' + msg;
            }
            msg = result.msg + '\n' + msg;
          }
        }
      }
      this.errorMessage = msg || 'Se ha producido un error al procesar su solicitud';
    });
  }
}
