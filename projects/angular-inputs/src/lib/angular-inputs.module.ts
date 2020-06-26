import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {InputFieldComponent} from './inputfield.component';
import {SelectFieldComponent} from './selectfield.component';
import {TextareaFieldComponent} from './textareafield.component';
import {InputMoneyComponent} from './inputmoney.component';
import {InputPercentComponent} from './inputpercent.component';
import {NgfloatDirective} from './directives/ngfloat.directive';
import {NgintDirective} from './directives/ngint.directive';
import {YesNoPipe} from './directives/yesno.pipe';
import {EscapeHtmlPipe} from './directives/keep-html.pipe';
import {SwitchFieldComponent} from './switchfield.component';
import {SelectGroupFieldComponent} from './selectgroupfield.component';
import {SelectMultiFieldComponent} from './selectmultiplefield.component';
import {SelectGroupMultiFieldComponent} from './selectgroupmultiplefield.component';
import {InputDateComponent} from './inputdate.component';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {UiSwitchModule} from 'ngx-ui-switch';
import {InputUploadComponent} from './uploadfield.component';
import {HtmlFieldComponent} from './htmlfield.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import {CropperComponent} from './cropper.component';
import {LoadingComponent} from './utils/loading/loading.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {CropperDialogComponent} from './cropperdialog.component';
import {InputMaskComponent} from './inputmask.component';
import {InputPhoneComponent} from './inputphone.component';
import {TextMaskModule} from 'angular2-text-mask';


@NgModule({
  declarations: [
    NgfloatDirective,
    NgintDirective,
    YesNoPipe,
    EscapeHtmlPipe,
    InputFieldComponent,
    InputDateComponent,
    InputUploadComponent,
    InputMaskComponent,
    InputPhoneComponent,
    SelectFieldComponent,
    SelectGroupFieldComponent,
    SelectMultiFieldComponent,
    SelectGroupMultiFieldComponent,
    TextareaFieldComponent,
    InputPercentComponent,
    InputMoneyComponent,
    SwitchFieldComponent,
    HtmlFieldComponent,
    CropperComponent,
    CropperDialogComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UiSwitchModule,
    NgbDatepickerModule,
    EditorModule,
    TextMaskModule,
    ImageCropperModule
  ],
  exports: [
    InputFieldComponent,
    InputDateComponent,
    InputUploadComponent,
    InputMaskComponent,
    InputPhoneComponent,
    SelectFieldComponent,
    SelectGroupFieldComponent,
    SelectMultiFieldComponent,
    SelectGroupMultiFieldComponent,
    TextareaFieldComponent,
    InputPercentComponent,
    InputMoneyComponent,
    SwitchFieldComponent,
    HtmlFieldComponent,
    CropperComponent,
    LoadingComponent
  ]
})
export class AngularInputsModule {
}
