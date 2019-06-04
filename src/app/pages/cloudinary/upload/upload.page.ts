import { Component, OnDestroy, OnInit } from '@angular/core';
import { CloudinaryService } from '../../../providers/cloudinary.service';
import { Events, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit, OnDestroy {

  imageForm: FormGroup;
  uploadButtonDefaultText = 'Choose a file';
  imagePreviewDefault     = '/assets/img/grid-no-image.png';
  uploadButtonText        = this.uploadButtonDefaultText;
  autoUploadButtonText    = this.uploadButtonDefaultText;
  imagePreview            = this.imagePreviewDefault;
  autoUpload        : boolean;
  uploadResponse    : any;
  autoUploadResponse: any;


  constructor(public cloudinaryService: CloudinaryService,
              public events: Events,
              public formBuilder: FormBuilder,
              public toastController: ToastController) {
    this.imageForm  = this.createMyForm();
  }


  // Upload event subscription
  ngOnInit() {
    this.cloudinaryService.fileProgress = 0;
    this.events.subscribe('cloudinary:upload', (args: any) => {
      console.log(JSON.parse(args.response));
      if (this.autoUpload)
        this.autoUploadResponse = JSON.parse(args.response);
      else
        this.uploadResponse = JSON.parse(args.response);
      this.presentToast(args.success);
    });
  }


  // Upload event unsubscription
  ngOnDestroy() {
    this.events.unsubscribe('cloudinary:upload');
  }


  // Form builder validator
  private createMyForm() {
    return this.formBuilder.group({
      image:   ['', Validators.required],
      tags:    [''],
      caption: [''],
      alt:     ['']
    });
  }


  // It fires when a file is selected
  onFileChange($event: Event) {
    // @ts-ignore
    const file = $event.target.files[0]; // <--- File Object for future use

    if (file) {
      this.imageForm.controls.image.setValue(file.name);
      this.uploadButtonText = file.name;
      this.getImagePreview(file);
    } else {
      this.imageForm.controls.image.setValue('');
      this.uploadButtonText = this.uploadButtonDefaultText;
      this.imagePreview = this.imagePreviewDefault;
    }

    this.cloudinaryService.fileProgress = 0;
  }


  // Upload content to Cloudinary
  upload(autoUpload: boolean) {
    this.autoUpload = autoUpload;
    this.uploadResponse = null;
    this.cloudinaryService.fileProgress = 0;
    this.cloudinaryService.upload({
      context: {
        caption: this.imageForm.value.caption,
        alt:     this.imageForm.value.alt
      },
      tags: this.imageForm.value.tags
    });
  }


  // Click on the hidden button
  imageInputSetFocus(input: HTMLInputElement) {
    input.click();
  }


  // Render the selected image to load a preview
  getImagePreview(file) {
    const reader = new FileReader();
    reader.onload = (e: any) => this.imagePreview = e.target.result;
    reader.readAsDataURL(file);
  }


  // Upload image notification
  async presentToast(success: boolean) {

    const successMessage = 'Your image have been saved.';
    const failMessage = 'An error occurred while loading image.';
    const toastMessage = success ? successMessage : failMessage;

    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }

}
