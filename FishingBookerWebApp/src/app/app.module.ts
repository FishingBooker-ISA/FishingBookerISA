import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminNavbarComponent } from './components/admin-profile/admin-navbar/admin-navbar.component';
import { AccountRequestsComponent } from './components/admin-profile/account-requests/account-requests.component';
import { UsersTableComponent } from './components/admin-profile/users-table/users-table.component';
import { DeleteRequestsComponent } from './components/admin-profile/delete-requests/delete-requests.component';
import { NewAdminFormComponent } from './components/admin-profile/new-admin-form/new-admin-form.component';
import { SignupOwnersComponent } from './components/signup-owners/signup-owners.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { AdminRequestsService } from './services/admin-requests.service';
import { SignupOwnersService } from './services/signup-owners.service';
import { EstateProfileComponent } from './components/estate-profile/estate-profile.component';
import { EstateOwnerNavbarComponent } from './components/estate-owner-navbar/estate-owner-navbar.component';
import { EstateOwnerHomepageComponent } from './components/estate-owner-homepage/estate-owner-homepage.component';
import { MatIconModule } from '@angular/material/icon';
import { EditEstateComponent } from './components/estate-profile/edit-estate/edit-estate.component';
import { CreateEstateComponent } from './components/create-estate/create-estate.component'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { UnauthenticatedUserNavbarComponent } from './components/unauthenticated-user-navbar/unauthenticated-user-navbar.component';
import { EstatesComponent } from './components/estates/estates.component';
import { FishingInstructorsComponent } from './components/fishing-instructors/fishing-instructors.component';
import { BoatsComponent } from './components/boats/boats.component';
import { ClientNavbarComponent } from './components/client-profile/client-navbar/client-navbar.component';
import { UpcomingReservationsComponent } from './components/client-profile/upcoming-reservations/upcoming-reservations.component';
import { EstateReservationHistoryComponent } from './components/client-profile/estate-reservation-history/estate-reservation-history.component';
import { SubscriptionsComponent } from './components/client-profile/subscriptions/subscriptions.component';
import { ViewProfileComponent } from './components/client-profile/view-profile/view-profile.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { OwnerProfileComponent } from './components/owner-profile/owner-profile.component';
import { InstructorNavbarComponent } from './components/instructor-components/instructor-navbar/instructor-navbar.component';
import { AdventureProfileComponent } from './components/instructor-components/adventure-profile/adventure-profile.component';
import { InstructorAdventuresComponent } from './components/instructor-components/instructor-adventures/instructor-adventures.component';
import { NewAdventureComponent } from './components/instructor-components/new-adventure/new-adventure.component';
import { EditAdventureComponent } from './components/instructor-components/adventure-profile/edit-adventure/edit-adventure.component';
import { RatingsReviewComponent } from './components/ratings-review/ratings-review.component';
import { ClientVerificationComponent } from './components/client-profile/client-verification/client-verification.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    LoginComponent,
    SignupComponent,
    AdminProfileComponent,
    AdminNavbarComponent,
    AccountRequestsComponent,
    UsersTableComponent,
    DeleteRequestsComponent,
    NewAdminFormComponent,
    SignupOwnersComponent,
    EstateProfileComponent,
    EstateOwnerNavbarComponent,
    EstateOwnerHomepageComponent,
    EditEstateComponent,
    CreateEstateComponent,
    UnauthenticatedUserNavbarComponent,
    EstatesComponent,
    FishingInstructorsComponent,
    BoatsComponent,
    ClientNavbarComponent,
    UpcomingReservationsComponent,
    EstateReservationHistoryComponent,
    SubscriptionsComponent,
    ViewProfileComponent,
    ConfirmDialogComponent,
    OwnerProfileComponent,
    InstructorNavbarComponent,
    AdventureProfileComponent,
    InstructorAdventuresComponent,
    NewAdventureComponent,
    EditAdventureComponent,
    RatingsReviewComponent,
    ClientVerificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule, 
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    SignupOwnersService,
    AdminRequestsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
