# Angular Inputs

A collection of reusable input fields

## Development server

## Build & pack

Run `npm run build` to build and pack the project.

Run `npm run buildprod` to build and pack the project for production.

## Peer dependencies in the target project

- `npm install ngx-ui-switch`
- `npm install bootstrap`
- `npm install font-awesome`
- Add the following stylesheets to the `styles` section of the `angular.json` file:  
    - `node_modules/ngx-ui-switch/ui-switch.component.scss`  
    - `node_modules/bootstrap/dist/css/bootstrap.min.css`  
    - `node_modules/font-awesome/css/font-awesome.css`  

## NgbDatepicker formatters and parser
Add in the `providers` of the `app.module` file on your project the String adapter:

```
{provide: NgbDateAdapter, useClass: NgbDateISOStringAdapter},
``` 

And the date parser that fits the project locale:    
```
{provide: NgbDateParserFormatter, useClass: NgbDateDMYParserFormatter},
{provide: NgbDateParserFormatter, useClass: NgbDateMDYParserFormatter},
``` 

## Image cropper
In order to use this field you need to install NgxImageCropper

- `npm install ngx-image-cropper`

## Image cropper
In order to use this field you need to install TextMask

- `npm install angular2-text-mask`

## HTML Editor
In order to use this field you need to import the module and the tinyMCE script as explained in
https://www.tiny.cloud/docs/integrations/angular/

- `npm install --save @tinymce/tinymce-angular`
- `npm install tinymce`

Add in the `imports` and `providers` of the `app.module` file on your project the following:
```
imports: [ EditorModule ],
providers: [ { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }]
```

Add the following stylesheets to the `assets` section of the `angular.json` file:  
- `{ "glob": "**/*", "input": "node_modules/tinymce", "output": "/tinymce/" }`

TinyMCE initializes with default options which can be overriden by passing a new object to the `tinyHtmlOptions` attribute.
