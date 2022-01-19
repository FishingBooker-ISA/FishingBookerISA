import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavigationToolDTO, ShipNavigationTool } from 'src/app/model/ship';
import { ManagingShipsService } from 'src/app/services/managing-ships-service.service';

@Component({
  selector: 'app-edit-navigation-tools',
  templateUrl: './edit-navigation-tools.component.html',
  styleUrls: ['./edit-navigation-tools.component.css']
})
export class EditNavigationToolsComponent implements OnInit {

  tools!: ShipNavigationTool[]
  selectedItem!: NavigationToolDTO
  editClicked!: boolean
  newItem!: NavigationToolDTO
  addNewItem!: boolean
  id!: number

  constructor(public dialogRef: MatDialogRef<EditNavigationToolsComponent>, @Inject(MAT_DIALOG_DATA)
  public data: EditNavigationToolsDialog, public shipsService: ManagingShipsService) { }

  ngOnInit(): void {
    this.tools = this.data.tools; this.editClicked = false; this.id = this.data.id;
    this.addNewItem = false; this.newItem = new NavigationToolDTO();
  }

  selectItem(item: NavigationToolDTO) {
    this.selectedItem = item
  }

  edit() {
    this.editClicked = !this.editClicked;

    let dto: NavigationToolDTO = {
      id: this.selectedItem.id,
      name: this.selectedItem.name,
      description: this.selectedItem.description,
      shipId: this.id
    }

    if (!this.editClicked)
      this.shipsService.editTools(dto);
  }

  delete() {
    let dto: NavigationToolDTO = {
      id: this.selectedItem.id,
      name: this.selectedItem.name,
      description: this.selectedItem.description,
      shipId: this.id
    }

    this.shipsService.deleteTool(dto);

    setTimeout(() => {
      this.shipsService.getAllNavigationTools(this.id).subscribe((data) => this.tools = data);
    }, 500);
  }

  create() {
    this.addNewItem = !this.addNewItem

    let dto: NavigationToolDTO = {
      id: this.newItem.id,
      name: this.newItem.name,
      description: this.newItem.description,
      shipId: this.id
    }

    if (!this.addNewItem) {
      this.shipsService.addTool(dto);

      setTimeout(() => {
        this.shipsService.getAllNavigationTools(this.id).subscribe((data) => this.tools = data);
        this.newItem = new NavigationToolDTO();
      }, 300);
    }
  }

  isReadOnly(item: NavigationToolDTO) {
    if (this.selectedItem == item && this.editClicked) {
      return false;
    }

    return true;
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

}

export class EditNavigationToolsDialog {
  constructor(
    public tools: ShipNavigationTool[],
    public id: number
  ) { }
}