import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  errorMessage = ""

  constructor(public managingEstateService: ManagingEstateService, public managingImages: ManagingImagesService,
    private sanitizer: DomSanitizer, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  cancelEditing() {
    this.editingMode = false;
    window.location.reload()
  }

  hasErrors() {
    if (this.estate.name === "" || this.estate.pricePerDay === null ||
      this.estate.numOfBeds === null || this.estate.numOfRooms === null ||
      this.estate.description === "" || this.estate.termsOfUse === "" || this.estate.capacity === null)
      return true;

    return false
  }

  saveChanges() {
    this.managingEstateService.editEstate(this.estate).subscribe(
      (data) => {
        this._snackBar.open("Successfully updated!", 'Dissmiss', {
          duration: 3000
        });
        window.location.reload();
      },
      (error) => {
        this._snackBar.open("Estate has reservations and can't be edited!", 'Dissmiss', {
          duration: 3000
        });
      });;
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
  }

}
