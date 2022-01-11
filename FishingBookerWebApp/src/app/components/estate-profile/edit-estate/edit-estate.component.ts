import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Estate } from 'src/app/model/estate';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';

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

  checkField = new FormControl('', [Validators.required]);
  constructor(public managingEstateService: ManagingEstateService) { }

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

}
