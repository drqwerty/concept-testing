import {Component, OnInit } from '@angular/core';
import { CloudinaryService } from '../../../providers/cloudinary.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-load-by-tag',
  templateUrl: './load-by-tag.page.html',
  styleUrls: ['./load-by-tag.page.scss'],
})
export class LoadByTagPage implements OnInit {

  private images: any;
  private chunkLength = 3;
  private tag = '';
  private searchBoxHidden = false;

  private scrollTop = 0;
  private scrollTopPrevious = 0;
  private threshold = 100;

  constructor(public cloudinaryService: CloudinaryService) {
  }


  ngOnInit() {
    this.tag = 'tag';
    // this.tag = '';
    this.loadImages();
  }


  private loadImages() {
    if (this.tag !== '') {
      this.cloudinaryService.getImagesByTag(this.tag)
          .then(
              value => this.images = _.chunk(value, this.chunkLength),
              ()    => this.images = null);
    } else {
      this.images = null;
    }
  }


  scroll($event: CustomEvent<any>) {
    const scrollTop = $event.detail.scrollTop;
    if (scrollTop > this.threshold) this.searchBoxHidden = true;
    else this.searchBoxHidden = false;

    if (this.scrollTopPrevious > scrollTop) this.searchBoxHidden = false;

    this.scrollTopPrevious = scrollTop;
  }

  clearInput() {
    this.tag = '';
    this.images = null;
  }
}
