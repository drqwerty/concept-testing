import { Injectable } from '@angular/core';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { environment } from '../../environments/environment.prod';
import { Events } from '@ionic/angular';
import { ParsedResponseHeaders } from 'ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  uploader: CloudinaryUploader = new CloudinaryUploader(
      new CloudinaryOptions({
        cloudName: environment.cloudinary.cloud_name,
        uploadPreset: environment.cloudinary.upload_preset
      })
  );
  fileProgress = 0;
  private file: any;


  constructor(public events: Events) { }


  upload(): Promise<string> {

    this.cleanQueue(); // Multiple uploads...
    this.file = this.uploader.getNotUploadedItems()[0];
    this.uploader.onProgressItem = (fileItem: any, progress: any): any => {
      this.fileProgress = progress;
    };
    if (this.file) this.uploader.uploadItem(this.file);

    return new Promise((resolve, reject) => {
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders): any =>
          resolve(response);
      this.uploader.onErrorItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders): any =>
          reject(response);
    });
  }


  private cleanQueue() {
    const notUploadedItems = this.uploader.getNotUploadedItems();
    for (let i = 0; i < notUploadedItems.length - 1; i++) {
      this.uploader.removeFromQueue(notUploadedItems[i]);
    }
  }


  setMetadata(metadata: any) {
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', environment.cloudinary.upload_preset);
      form.append('file', fileItem);
      form.append('tags', metadata.tags);
      form.append('context', `caption=${metadata.context.caption}|alt=${metadata.context.alt}`);
      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
    };
  }


  public getUploder(): CloudinaryUploader {
    return this.uploader;
  }


  public getFile() {
    return this.uploader.getNotUploadedItems()[0];
  }

}
