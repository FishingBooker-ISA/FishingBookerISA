import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Estate } from 'src/app/model/estate';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { ManagingImagesService } from 'src/app/services/managing-images.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-estate-profile',
  templateUrl: './estate-profile.component.html',
  styleUrls: ['./estate-profile.component.css']
})
export class EstateProfileComponent implements OnInit {

  estateId!: number;
  editingMode!: boolean;
  images = [] as any
  estate!: Estate;

  constructor(private route: ActivatedRoute, public managingEstateService: ManagingEstateService, private router: Router,
    public dialog: MatDialog, public managingImages: ManagingImagesService, private sanitizer: DomSanitizer) {
    this.route.params.subscribe((params) => {
      this.estateId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.editingMode = false
    this.managingEstateService.getEstateById(this.estateId).subscribe((data) => this.estate = data);
    this.imageFromDatabase();
  }

  editEstate() {
    this.editingMode = true;
  }

  deleteEstate() {
    const message = 'Are you sure you want to delete this property?';

    const dialogData = new ConfirmDialogModel(
      'Confirm deleting estate',
      message
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.managingEstateService.deleteEstate(this.estateId);
      }

      setTimeout(() => {
        this.router.navigate(['/estateOwner/home']);
      }, 500);
    });
  }

  imageFromDatabase() {
    this.managingImages.getImages(this.estateId).toPromise().then(
      (result) => {

        for (let r of result) {
          this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + r))
        }
      });
  }

}
