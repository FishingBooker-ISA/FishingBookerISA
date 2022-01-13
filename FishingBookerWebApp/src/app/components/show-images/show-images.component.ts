import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Estate } from 'src/app/model/estate';
import { Image } from 'src/app/model/image';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { ManagingImagesService } from 'src/app/services/managing-images.service';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.css']
})
export class ShowImagesComponent implements OnInit {

  estate!: Estate
  images = [] as any
  imagesToDelete = [] as any
  uploadedImgs = [] as any

  constructor(
    public dialogRef: MatDialogRef<ShowImagesComponent>, @Inject(MAT_DIALOG_DATA) public data: ImagesDialogModel,
    public managingImages: ManagingImagesService, private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.estate = this.data.estate; console.log(this.estate);
    this.imageFromDatabase();
  }

  imageFromDatabase() {
    this.images = []
    this.managingImages.getImages(this.estate.id).toPromise().then(
      (result) => {

        for (let r of result) {
          let img: Image = {
            id: r.id,
            bytes: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + r.bytes)
          }
          this.images.push(img)
        }
      });
  }

  getImage(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.uploadedImgs.push(event.target.files[i]);
    }
  }

  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  async addImage() {
    for (let img of this.uploadedImgs) {
      var code = await this.getBase64(img);
      this.managingImages.addImage(this.estate.id, code);
    }

    setTimeout(() => {
      this.imageFromDatabase();
    }, 500);
  }

  selectImage(id: number) {
    const index: number = this.imagesToDelete.indexOf(id);

    if (index > -1) {
      this.imagesToDelete.splice(index, 1);
    }
    else {
      this.imagesToDelete.push(id);
    }

  }

  checkIfImageIsClicked(id: number) {
    if (this.imagesToDelete.indexOf(id) > -1)
      return true;

    return false;
  }

  deleteImages() {
    console.log(this.imagesToDelete);
    this.managingImages.deleteImages(this.imagesToDelete);
    this.imagesToDelete = []

    setTimeout(() => {
      this.imageFromDatabase();
    }, 500);
  }

  onDismiss(): void {
    this.dialogRef.close();
  }

}

export class ImagesDialogModel {
  constructor(
    public estate: Estate
  ) { }
}