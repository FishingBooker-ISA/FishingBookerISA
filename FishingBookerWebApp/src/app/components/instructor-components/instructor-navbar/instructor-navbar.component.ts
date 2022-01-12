import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { createAdventureDTO } from 'src/app/model/adventure';
import { ManagingAdventuresService } from 'src/app/services/managing-adventures.service';
import { DetailsDialogModel, NewAdventureComponent } from '../new-adventure/new-adventure.component';

@Component({
  selector: 'app-instructor-navbar',
  templateUrl: './instructor-navbar.component.html',
  styleUrls: ['./instructor-navbar.component.css']
})
export class InstructorNavbarComponent implements OnInit {
  collapsed = false;
  
  createModalResult!: boolean

  constructor(public dialog: MatDialog, public service: ManagingAdventuresService, private router: Router) { }

  ngOnInit(): void {
  }

  confirmTransferCancelDialog(): void {
    const dialogData = new DetailsDialogModel(
      new createAdventureDTO()
    );

    const dialogRef = this.dialog.open(NewAdventureComponent, {
      width: '1000px',
      height: '730px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.createModalResult = dialogResult

      if (this.createModalResult) {
        setTimeout(() => {
          this.router.navigate(['/instructor/home']);
        }, 500);
      }
    });
  }

}

