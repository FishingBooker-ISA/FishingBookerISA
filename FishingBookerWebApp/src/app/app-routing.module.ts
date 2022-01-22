import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth-guard/admin.guard';
import { EstateOwnerAuthGuard } from './auth-guard/estate-owner-auth-guard';
import { InstructorGuard } from './auth-guard/instructor.guard';
import { ShipOwnerAuthGuardGuard } from './auth-guard/ship-owner-auth-guard.guard';
import { AccountRequestsComponent } from './components/admin-profile/account-requests/account-requests.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AllComplaintsComponent } from './components/admin-profile/all-complaints/all-complaints.component';
import { AllReportsComponent } from './components/admin-profile/all-reports/all-reports.component';
import { DeleteRequestsComponent } from './components/admin-profile/delete-requests/delete-requests.component';
import { NewAdminFormComponent } from './components/admin-profile/new-admin-form/new-admin-form.component';
import { NewAdminLoginComponent } from './components/admin-profile/new-admin-login/new-admin-login.component';
import { ServicesTableComponent } from './components/admin-profile/services-table/services-table.component';
import { UsersTableComponent } from './components/admin-profile/users-table/users-table.component';
import { AdventureClientProfileComponent } from './components/adventure-client-profile/adventure-client-profile.component';
import { BoatClientProfileComponent } from './components/boat-client-profile/boat-client-profile.component';
import { BoatsComponent } from './components/boats/boats.component';
import { BussinessReportComponent } from './components/bussiness-report/bussiness-report.component';
import { ClientVerificationComponent } from './components/client-profile/client-verification/client-verification.component';
import { EstateReservationHistoryComponent } from './components/client-profile/estate-reservation-history/estate-reservation-history.component';
import { SubscriptionsComponent } from './components/client-profile/subscriptions/subscriptions.component';
import { UpcomingReservationsComponent } from './components/client-profile/upcoming-reservations/upcoming-reservations.component';
import { ViewProfileComponent } from './components/client-profile/view-profile/view-profile.component';
import { EstateClientProfileComponent } from './components/estate-client-profile/estate-client-profile.component';
import { EstateOwnerHomepageComponent } from './components/estate-owner-homepage/estate-owner-homepage.component';
import { EditEstateComponent } from './components/estate-profile/edit-estate/edit-estate.component';
import { EstateProfileComponent } from './components/estate-profile/estate-profile.component';
import { EstatesComponent } from './components/estates/estates.component';
import { FishingInstructorsComponent } from './components/fishing-instructors/fishing-instructors.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AdventureProfileComponent } from './components/instructor-components/adventure-profile/adventure-profile.component';
import { InstructorAdventuresComponent } from './components/instructor-components/instructor-adventures/instructor-adventures.component';
import { NewReportComponent } from './components/instructor-components/new-report/new-report.component';
import { LoginComponent } from './components/login/login.component';
import { MapModalComponent } from './components/map-modal/map-modal.component';
import { OwnerProfileComponent } from './components/owner-profile/owner-profile.component';
import { RatingsReviewComponent } from './components/ratings-review/ratings-review.component';
import { ShipOwnerHomepageComponent } from './components/ship-owner-homepage/ship-owner-homepage.component';
import { ShipProfileComponent } from './components/ship-profile/ship-profile.component';
import { SignupOwnersComponent } from './components/signup-owners/signup-owners.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/ratings', component: RatingsReviewComponent, canActivate: [AdminGuard] },
  { path: 'admin/accountRequests', component: AccountRequestsComponent, canActivate: [AdminGuard] },
  { path: 'admin/deleteRequests', component: DeleteRequestsComponent, canActivate: [AdminGuard] },
  { path: 'admin/allUsers', component: UsersTableComponent, canActivate: [AdminGuard] },
  { path: 'admin/allServices', component: ServicesTableComponent, canActivate: [AdminGuard] },
  { path: 'admin/addNewAdmin', component: NewAdminFormComponent, canActivate: [AdminGuard] },
  { path: 'admin/allComplaints', component: AllComplaintsComponent, canActivate: [AdminGuard] },
  { path: 'admin/allReports', component: AllReportsComponent, canActivate: [AdminGuard] },
  { path: 'admin/changePassword', component: NewAdminLoginComponent, canActivate: [AdminGuard] },
  { path: 'client/reservationHistory/estate', component: EstateReservationHistoryComponent },
  { path: 'client/upcomingReservations', component: UpcomingReservationsComponent },
  { path: 'client/subscriptions', component: SubscriptionsComponent },
  { path: 'client/profile', component: ViewProfileComponent },
  { path: 'verifyClient/:code', component: ClientVerificationComponent },
  { path: 'signup/owners', component: SignupOwnersComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'estateOwner/home', component: EstateOwnerHomepageComponent, canActivate: [EstateOwnerAuthGuard] },
  { path: 'estate/:id', component: EstateProfileComponent, canActivate: [EstateOwnerAuthGuard] },
  { path: 'client/estate/:id', component: EstateClientProfileComponent },
  { path: 'client/adventure/:id', component: AdventureClientProfileComponent },
  { path: 'client/boat/:id', component: BoatClientProfileComponent },
  { path: 'estates', component: EstatesComponent },
  { path: 'boats', component: BoatsComponent },
  { path: 'fishing-instructors', component: FishingInstructorsComponent },
  { path: 'instructor/home', component: InstructorAdventuresComponent, canActivate: [InstructorGuard] },
  { path: 'adventure/:id', component: AdventureProfileComponent, canActivate: [InstructorGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'profile', component: OwnerProfileComponent },
  { path: 'shipOwner/home', component: ShipOwnerHomepageComponent, canActivate: [ShipOwnerAuthGuardGuard] },
  { path: 'ship/:id', component: ShipProfileComponent, canActivate: [ShipOwnerAuthGuardGuard] },
  { path: 'map', component: MapModalComponent },
  { path: 'report', component: BussinessReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [
  HomepageComponent,
  LoginComponent,
  SignupComponent,
  AccountRequestsComponent,
  UsersTableComponent,
  DeleteRequestsComponent,
  NewAdminFormComponent,
];
