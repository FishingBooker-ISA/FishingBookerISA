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
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
import { DeletionRequestComponent } from './components/deletion-request/deletion-request.component';
import { AllComplaintsComponent } from './components/admin-profile/all-complaints/all-complaints.component';
import { ShowImagesComponent } from './components/show-images/show-images.component';
import { EditProfileComponent } from './components/owner-profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NewAdminLoginComponent } from './components/admin-profile/new-admin-login/new-admin-login.component';
import { CreateComplaintComponent } from './components/client-profile/create-complaint/create-complaint.component';
import { CreateReviewComponent } from './components/client-profile/create-review/create-review.component';
import { AllReportsComponent } from './components/admin-profile/all-reports/all-reports.component';
import { NewReportComponent } from './components/instructor-components/new-report/new-report.component';
import { PromoActionsComponent } from './components/estate-profile/promo-actions/promo-actions.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditAdditionalServicesComponent } from './components/edit-additional-services/edit-additional-services.component';
import { AddEquipmentComponent } from './components/create-estate/add-equipment/add-equipment.component';
import { EstateOwnerAuthGuard } from './auth-guard/estate-owner-auth-guard';
import { CreateReservationComponent } from './components/estate-profile/create-reservation/create-reservation.component';
import { CreateReservationInstructorComponent } from './components/instructor-components/adventure-profile/create-reservation-instructor/create-reservation-instructor.component';
import { ReservationCalendarComponent } from './components/reservation-calendar/reservation-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UnavailablePeriodDialogComponent } from './components/reservation-calendar/unavailable-period-dialog/unavailable-period-dialog.component';
import { DetailsDialogComponent } from './components/reservation-calendar/details-dialog/details-dialog.component';
import { ShipOwnerHomepageComponent } from './components/ship-owner-homepage/ship-owner-homepage.component';
import { ShipOwnerNavbarComponent } from './components/ship-owner-navbar/ship-owner-navbar.component';
import { ShipProfileComponent } from './components/ship-profile/ship-profile.component';
import { EditShipProfileComponent } from './components/ship-profile/edit-ship-profile/edit-ship-profile.component';
import { CreateReservationShipsComponent } from './components/ship-profile/create-reservation-ships/create-reservation-ships.component';
import { CreateShipComponent } from './components/ship-profile/create-ship/create-ship.component';
import { AddNavigationToolsComponent } from './components/ship-profile/create-ship/add-navigation-tools/add-navigation-tools.component';
import { EditNavigationToolsComponent } from './components/ship-profile/edit-navigation-tools/edit-navigation-tools.component';
import { ServicesTableComponent } from './components/admin-profile/services-table/services-table.component';
import { MapModalComponent } from './components/map-modal/map-modal.component';
import { ShowLocationOnMapComponent } from './components/show-location-on-map/show-location-on-map.component';
import { ClientReservationDialogComponent } from './components/client-reservation-dialog/client-reservation-dialog.component';
import { BussinessReportComponent } from './components/bussiness-report/bussiness-report.component';
import { ChartsModule } from 'ng2-charts';
import { EstateClientProfileComponent } from './components/estate-client-profile/estate-client-profile.component';
import { BoatClientProfileComponent } from './components/boat-client-profile/boat-client-profile.component';
import { AdventureClientProfileComponent } from './components/adventure-client-profile/adventure-client-profile.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);


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
    DeletionRequestComponent,
    AllComplaintsComponent,
    ShowImagesComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    NewAdminLoginComponent,
    CreateComplaintComponent,
    CreateReviewComponent,
    AllReportsComponent,
    NewReportComponent,
    PromoActionsComponent,
    EditAdditionalServicesComponent,
    AddEquipmentComponent,
    CreateReservationComponent,
    CreateReservationInstructorComponent,
    ReservationCalendarComponent,
    UnavailablePeriodDialogComponent,
    DetailsDialogComponent,
    ShipOwnerHomepageComponent,
    ShipOwnerNavbarComponent,
    ShipProfileComponent,
    EditShipProfileComponent,
    CreateReservationShipsComponent,
    CreateShipComponent,
    AddNavigationToolsComponent,
    EditNavigationToolsComponent,
    ServicesTableComponent,
    MapModalComponent,
    ShowLocationOnMapComponent,
    ClientReservationDialogComponent,
    BussinessReportComponent,
    EstateClientProfileComponent,
    BoatClientProfileComponent,
    AdventureClientProfileComponent
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
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FullCalendarModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    EstateOwnerAuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
