import { Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NewComplaintDTO } from 'src/app/model/complaint';
import { ComplaintsService } from 'src/app/services/complaints.service';


export interface DialogData {
  serviceId: number;
  clientId: number;
}

@Component({
  selector: 'app-create-complaint',
  templateUrl: './create-complaint.component.html',
  styleUrls: ['./create-complaint.component.css']
})
export class CreateComplaintComponent implements OnInit {

  selected:string = "service";
  complaintText: string = "";
  complaint: NewComplaintDTO = new NewComplaintDTO();

  constructor(public complaintService: ComplaintsService, public dialogRef: MatDialogRef<CreateComplaintComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSend(){
    this.complaint.clientId = this.data.clientId;
    this.complaint.serviceId = this.data.serviceId;
    this.complaint.isComplaintOnOwner = true;
    this.complaint.reason = this.complaintText;
    this.complaintService.sendNewComplaint(this.complaint);
    this.dialogRef.close(true);
  }

}
