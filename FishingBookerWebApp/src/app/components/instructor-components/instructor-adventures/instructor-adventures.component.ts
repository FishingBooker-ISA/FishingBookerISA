import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adventure } from 'src/app/model/adventure';
import { ManagingAdventuresService } from 'src/app/services/managing-adventures.service';

@Component({
  selector: 'app-instructor-adventures',
  templateUrl: './instructor-adventures.component.html',
  styleUrls: ['./instructor-adventures.component.css']
})
export class InstructorAdventuresComponent implements OnInit {

  myAdventures!: Adventure[];
  searchAdventures!: string;

  constructor(public service: ManagingAdventuresService, private router: Router) { }

  ngOnInit(): void {
    this.service.getAllAdventuresForInstructor().subscribe((data) => this.myAdventures = data)
  }

  searchAdventuresByName() {
    if (this.searchAdventures == '') {
      this.service
        .getAllAdventuresForInstructor()
        .toPromise()
        .then((res) => (this.myAdventures = res as Adventure[]));
    } else {
      this.service
        .getAdventureByName(this.searchAdventures)
        .toPromise()
        .then((res) => (this.myAdventures = res as Adventure[]));
    }
  }

  showAdventure(adventureId: number) {
    this.router.navigate(['/adventure', adventureId]);
  }

}
