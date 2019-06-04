import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    {
      pages: [
        {
          title: 'Technologies',
          url: '/technologies',
          icon: 'information-circle-outline'
        }
      ]
    },
    {
      header: 'Cloud Firestore',
      hidden: true,
      pages: [
        {
          title: 'Create content',
          url: '/s',
          icon: 'create'
        },
        {
          title: 'Read content',
          url: '/s',
          icon: 'eye'
        },
        {
          title: 'Update content',
          url: '/s',
          icon: 'sync'
        },
        {
          title: 'Delete content',
          url: '/s',
          icon: 'trash'
        }
      ]
    },
    {
      header: 'Cloudinary',
      hidden: true,
      pages: [
        {
          title: 'Upload image',
          url: '/cloudinary-upload',
          icon: 'cloud-upload'
        },
        {
          title: 'Load images by tag',
          url: '/s',
          icon: 'cloud-download'
        }
      ]
    }
  ];

  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  toggleGroup(group: any) {
    group.hidden = !group.hidden;
  }

}
