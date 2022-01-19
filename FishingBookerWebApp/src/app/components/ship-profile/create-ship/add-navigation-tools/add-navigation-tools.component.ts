import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavigationToolDTO } from 'src/app/model/ship';

@Component({
  selector: 'app-add-navigation-tools',
  templateUrl: './add-navigation-tools.component.html',
  styleUrls: ['./add-navigation-tools.component.css']
})
export class AddNavigationToolsComponent implements OnInit {

  newItem!: NavigationToolDTO

  constructor(public dialogRef: MatDialogRef<AddNavigationToolsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewNavigationToolDialog) { }

  ngOnInit(): void {
    this.newItem = new NavigationToolDTO();
  }

  onDismiss(): void {
    this.dialogRef.close(null);
  }

  onAdd() {
    this.dialogRef.close(this.newItem);
  }

}

export class NewNavigationToolDialog {
  constructor(
    public newItem: NavigationToolDTO
  ) { }
}
