import { Component } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { User } from './model/user';
import { SignupOwnersService } from './services/signup-owners.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FishingBooker';

  constructor() {
  }
}
