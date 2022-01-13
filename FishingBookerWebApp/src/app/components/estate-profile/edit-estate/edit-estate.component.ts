import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Estate } from 'src/app/model/estate';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { ManagingImagesService } from 'src/app/services/managing-images.service';
import { ImagesDialogModel, ShowImagesComponent } from '../../show-images/show-images.component';

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
    private sanitizer: DomSanitizer, public dialog: MatDialog) { }

  ngOnInit(): void {
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

  viewImages(): void {
    const dialogData = new ImagesDialogModel(
      this.estate
    );

    const dialogRef = this.dialog.open(ShowImagesComponent, {
      width: '900px',
      height: '720px',
      data: dialogData,
      panelClass: 'my-dialog'
    });

    // dialogRef.afterClosed().subscribe((dialogResult) => {
    //   this.createModalResult = dialogResult

    //   if (this.createModalResult) {
    //     setTimeout(() => {
    //       this.router.navigate(['/estateOwner/home']);
    //     }, 500);
    //   }
    // });
  }

}
