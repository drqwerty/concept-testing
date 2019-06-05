import { Component, OnInit } from '@angular/core';
import { CloudinaryService } from '../../../providers/cloudinary.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  imageForm: FormGroup;
  uploadButtonDefaultText = 'Choose a file';
  imagePreviewDefault     = '/assets/img/grid-no-image.png';
  uploadButtonText        = this.uploadButtonDefaultText;
  autoUploadButtonText    = this.uploadButtonDefaultText;
  imagePreview            = this.imagePreviewDefault;
  autoUpload              : boolean;
  uploadResponse          : any;
  autoUploadResponse      : any;


  constructor(public cloudinaryService: CloudinaryService,
              public formBuilder: FormBuilder,
              public toastController: ToastController) {
    this.imageForm  = this.createMyForm();
  }


  ngOnInit() {
    this.cloudinaryService.fileProgress = 0;
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
    this.cloudinaryService.setMetadata({
      context: {
        caption: this.imageForm.value.caption,
        alt:     this.imageForm.value.alt
      },
      tags: this.imageForm.value.tags
    });

    this.cloudinaryService.upload()
        .then(value => {
              const response = JSON.parse(value);
              console.log(response);
              if (this.autoUpload) this.autoUploadResponse = response;
              else this.uploadResponse = response;
              this.presentToast('Your image have been saved.');
            },

            value => {
              console.log('fail', value);
              this.presentToast('An error occurred while loading image.');
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
  async presentToast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }

}
