import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Adventure } from 'src/app/model/adventure';
import { ManagingAdventuresService } from 'src/app/services/managing-adventures.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-adventure-profile',
  templateUrl: './adventure-profile.component.html',
  styleUrls: ['./adventure-profile.component.css']
})
export class AdventureProfileComponent implements OnInit {

  adventureId! : number;
  adventure! : Adventure;
  editingMode!: boolean;

  constructor(private route: ActivatedRoute, public service: ManagingAdventuresService, private router: Router,
    public dialog: MatDialog) {
    this.route.params.subscribe((params) => {
      this.adventureId = +params['id'];
    });
   }

  ngOnInit(): void {
    this.editingMode = false;
    this.service.getAdventureById(this.adventureId).subscribe((data) => this.adventure = data);
  }

  editAdventure() {
    this.editingMode = true;
  }

  deleteAdventure() {
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
        this.service.deleteAdventure(this.adventureId);
      }

      setTimeout(() => {
        this.router.navigate(['/instructor/home']);
      }, 500);
    });
  }

}
