import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdditionalServiceDTO } from 'src/app/model/additional-service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {

  newItem!: AdditionalServiceDTO

  constructor(public dialogRef: MatDialogRef<AddEquipmentComponent>, @Inject(MAT_DIALOG_DATA) public data: AddNewItemDialogModel) { }

  ngOnInit(): void {
    this.newItem = new AdditionalServiceDTO();
  }

  onDismiss(): void {
    this.dialogRef.close(null);
  }

  onAdd() {
    this.dialogRef.close(this.newItem);
  }

}

export class AddNewItemDialogModel {
  constructor(
    public newItem: AdditionalServiceDTO
  ) { }
}
