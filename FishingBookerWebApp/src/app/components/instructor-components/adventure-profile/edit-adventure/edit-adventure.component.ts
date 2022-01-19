import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagesDialogModel, ShowImagesComponent } from 'src/app/components/show-images/show-images.component';
import { Adventure } from 'src/app/model/adventure';
import { ManagingAdventuresService } from 'src/app/services/managing-adventures.service';
import { ManagingImagesService } from 'src/app/services/managing-images.service';

@Component({
  selector: 'app-edit-adventure',
  templateUrl: './edit-adventure.component.html',
  styleUrls: ['./edit-adventure.component.css']
})
export class EditAdventureComponent implements OnInit {
  @Input()
  adventure!: Adventure
  @Input()
  editingMode!: boolean
  imgSrc!: any
  fileToUpload: File | null = null;
  foundImages = [] as any
  uploadedImgs = [] as any
  errorMessage = ""

  checkField = new FormControl('', [Validators.required]);
  constructor(public service: ManagingAdventuresService, public managingImages: ManagingImagesService,
    private sanitizer: DomSanitizer, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  cancelEditing() {
    this.editingMode = false;
    window.location.reload()
  }

  hasErrors() {
    if (this.adventure.name === "" || this.adventure.pricePerDay === null ||
      this.adventure.description === "" || this.adventure.termsOfUse === "" ||
      this.adventure.capacity === null)
      return true;

    return false
  }

  saveChanges() {
    
    window.location.reload()
    this.service.editAdventure(this.adventure).subscribe(
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
      this.adventure.id
    );

    const dialogRef = this.dialog.open(ShowImagesComponent, {
      width: '900px',
      height: '720px',
      data: dialogData,
      panelClass: 'my-dialog'
    });
  }

}
