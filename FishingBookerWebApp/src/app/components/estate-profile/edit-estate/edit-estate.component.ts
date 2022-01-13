import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Estate } from 'src/app/model/estate';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { ManagingImagesService } from 'src/app/services/managing-images.service';

@Component({
  selector: 'app-edit-estate',
  templateUrl: './edit-estate.component.html',
  styleUrls: ['./edit-estate.component.css']
})
export class EditEstateComponent implements OnInit {

  @Input()
  estate!: Estate
  @Input()
  editingMode!: boolean
  imgSrc!: any
  fileToUpload: File | null = null;
  foundImages = [] as any
  uploadedImgs = [] as any

  constructor(public managingEstateService: ManagingEstateService, public managingImages: ManagingImagesService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.imageFromDatabase();
  }

  cancelEditing() {
    this.editingMode = false;
    window.location.reload()
  }

  hasErrors() {
    if (this.estate.name === "" || this.estate.pricePerDay === null ||
      this.estate.numOfBeds === null || this.estate.numOfRooms === null ||
      this.estate.description === "" || this.estate.termsOfUse === "" ||
      this.estate.additionalEquipment === "" || this.estate.capacity === null)
      return true;

    return false
  }

  saveChanges() {
    this.managingEstateService.editEstate(this.estate);
    window.location.reload()
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

  imageFromDatabase() {
    this.managingImages.getImages(this.estate.id).toPromise().then(
      (result) => {
        for (let r of result) {
          this.foundImages.push(this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + r))
        }
      });
  }

  async addImage() {
    let addedImages = [] as any
    for (let img of this.uploadedImgs) {
      var code = await this.getBase64(img);
      this.managingImages.addImage(this.estate.id, code);
    }
  }

}
