import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {HttpClient, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'cropper-dialog-field',
  templateUrl: './cropperdialog.component.html',
  styleUrls: ['./cropperdialog.component.scss']
})

export class CropperDialogComponent implements AfterViewInit {
  @ViewChild('filectr') filectr;
  @ViewChild('cropper') cropper: any;

  public processDone = 0;
  public uploading = false;
  public uploaded = false;
  public errorMessage: string = '';
  public imageloaded = false;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public originalImage: any = '';

  public uploadParams: any;
  public uploadUrl: string;
  public aspectRatio: number;
  public imageFormat: string;
  public cropperMinHeight: number;
  public cropperMinWidth: number;
  public submitted: boolean;
  public title: string;
  public maintainAspectRatio: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    public http: HttpClient
  ) {
  }

  ngAfterViewInit(): void {
    this.doSelect();
  }

  doSelect(): void {
    this.filectr.nativeElement.click();
  }

  clearUpload(): void {
    this.errorMessage = '';
    this.uploading = false;
    this.uploaded = false;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.originalImage = this.cropper.originalBase64;
    this.croppedImage = event.base64;
  }

  imageLoaded(): void {
    // show cropper
    this.imageloaded = true;
  }

  cropperReady(): void {
    // cropper ready
  }

  loadImageFailed(): void {
    // show message
  }

  doUpload(): void {
    if (!this.croppedImage) {
      return;
    }

    // create a new multipart-form for every file
    const formData = {};
    formData['_cropped'] = this.croppedImage;
    formData['_original'] = this.originalImage;

    // add extra params
    if ((this.uploadParams) && (typeof this.uploadParams == 'undefined') && (this.uploadParams !== null)) {
      this.uploadParams!.forEach(function(v: any, ix: any) {		// null assertion operator !
        formData[ix] = v;
      });
    }

    // create a http-post request and pass the form
    // tell it to report the upload progress
    const req = new HttpRequest('POST', this.uploadUrl, formData, {reportProgress: true});

    this.errorMessage = '';
    this.processDone = 0;
    setTimeout(() => {
      this.uploading = true;
    }, 1);
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
          if (event.body['error'] && event.body['error']['_e']) {
            this.errorMessage = event.body['error'] && event.body['error']['_e'];
          }
          if (event.body['msg']) {
            this.errorMessage = event.body['msg'];
          }
        } else {
          this.activeModal.close({
            file_cropped: event.body['file_cropped'],
            file_original: event.body['file_original'],
            url_cropped: event.body['url_cropped'],
            url_original: event.body['url_original']
          });
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
      this.processDone = 0;
      this.uploading = false;
      this.uploaded = true;

      let msg = '';
      if (result.status === 500) {
        msg = 'Se ha producido un error al procesar su solicitud';
      }

      if (result.status === 422) {
        if (result.errors && result.errors._cropped && result.errors._cropped[0]) {
          msg = result.errors._cropped[0];
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
      this.errorMessage = msg;
    });
  }

  fileChangeEvent($event: Event): void {
    this.imageChangedEvent = $event;
  }

  cancel(): void {
    this.activeModal.close(false);
  }
}
