import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoadByTagPage } from './load-by-tag.page';
import {CloudinaryConfiguration, CloudinaryModule} from '@cloudinary/angular-4.x';
import {Cloudinary} from 'cloudinary-core';
import {environment} from '../../../../environments/environment.prod';
// import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: LoadByTagPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        // HttpClientModule,
        CloudinaryModule.forRoot(
            {Cloudinary},
            {
                cloud_name: environment.cloudinary.cloud_name,
                secure: environment.cloudinary.secure
            } as CloudinaryConfiguration)
    ],
  declarations: [LoadByTagPage]
})
export class LoadByTagPageModule {}
