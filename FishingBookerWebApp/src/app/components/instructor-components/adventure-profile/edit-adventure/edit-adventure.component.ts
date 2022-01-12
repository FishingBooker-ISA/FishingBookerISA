import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Adventure } from 'src/app/model/adventure';
import { ManagingAdventuresService } from 'src/app/services/managing-adventures.service';

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

  checkField = new FormControl('', [Validators.required]);
  constructor(public service: ManagingAdventuresService) { }

  ngOnInit(): void {
  }

  cancelEditing() {
    this.editingMode = false;
    window.location.reload()
  }

  hasErrors() {
    if (this.adventure.name === "" || this.adventure.pricePerDay === null ||
      this.adventure.description === "" || this.adventure.termsOfUse === "" ||
      this.adventure.additionalEquipment === "" || this.adventure.capacity === null)
      return true;

    return false
  }

  saveChanges() {
    this.service.editAdventure(this.adventure);
    window.location.reload()
  }

}
