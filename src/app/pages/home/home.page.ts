import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public technologies = [
    {
      name: 'Ionic',
      img: '/assets/img/ionic-logo.png',
      info: [
        {
          module: 'Ionic CLI',
          version: '4.12.0'
        },
        {
          module: 'Ionic Framework',
          version: '@ionic/angular 4.4.2'
        }
      ]
    },
    {
      name: 'Firebase',
      img: '/assets/img/firestore-logo.png',
      info: [{module: 'Cloud Firestore'}]
    },
    {
      name: 'Cloudinary',
      img: '/assets/img/cloudinary-logo.png',
      info: [{module: 'Cloudinary'}]
    },
    {
      name: 'Cordova',
      img: '/assets/img/cordova-logo.png',
      info: [
        {
          module: 'Cordova CLI',
          version: '9.0.0 (cordova-lib@9.0.1)'
        }
      ]
    }
  ];

  constructor() {}

}
