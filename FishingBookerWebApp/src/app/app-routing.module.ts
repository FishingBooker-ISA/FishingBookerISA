import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstateOwnerAuthGuard } from './auth-guard/estate-owner-auth-guard';
import { InstructorGuard } from './auth-guard/instructor.guard';
import { AccountRequestsComponent } from './components/admin-profile/account-requests/account-requests.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AllComplaintsComponent } from './components/admin-profile/all-complaints/all-complaints.component';
import { AllReportsComponent } from './components/admin-profile/all-reports/all-reports.component';
import { DeleteRequestsComponent } from './components/admin-profile/delete-requests/delete-requests.component';
import { NewAdminFormComponent } from './components/admin-profile/new-admin-form/new-admin-form.component';
import { NewAdminLoginComponent } from './components/admin-profile/new-admin-login/new-admin-login.component';
import { UsersTableComponent } from './components/admin-profile/users-table/users-table.component';
import { BoatsComponent } from './components/boats/boats.component';
import { ClientVerificationComponent } from './components/client-profile/client-verification/client-verification.component';
import { EstateReservationHistoryComponent } from './components/client-profile/estate-reservation-history/estate-reservation-history.component';
import { SubscriptionsComponent } from './components/client-profile/subscriptions/subscriptions.component';
import { UpcomingReservationsComponent } from './components/client-profile/upcoming-reservations/upcoming-reservations.component';
import { ViewProfileComponent } from './components/client-profile/view-profile/view-profile.component';
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
import { OwnerProfileComponent } from './components/owner-profile/owner-profile.component';
import { RatingsReviewComponent } from './components/ratings-review/ratings-review.component';
import { ShipOwnerHomepageComponent } from './components/ship-owner-homepage/ship-owner-homepage.component';
import { ShipProfileComponent } from './components/ship-profile/ship-profile.component';
import { SignupOwnersComponent } from './components/signup-owners/signup-owners.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/ratings', component: RatingsReviewComponent },
  { path: 'admin/accountRequests', component: AccountRequestsComponent },
  { path: 'admin/deleteRequests', component: DeleteRequestsComponent },
  { path: 'admin/allUsers', component: UsersTableComponent },
  { path: 'admin/addNewAdmin', component: NewAdminFormComponent },
  { path: 'admin/allComplaints', component: AllComplaintsComponent },
  { path: 'admin/allReports', component: AllReportsComponent },
  { path: 'admin/changePassword', component: NewAdminLoginComponent },
  { path: 'client/reservationHistory/estate', component: EstateReservationHistoryComponent },
  { path: 'client/upcomingReservations', component: UpcomingReservationsComponent },
  { path: 'client/subscriptions', component: SubscriptionsComponent },
  { path: 'client/profile', component: ViewProfileComponent },
  { path: 'verifyClient/:code', component: ClientVerificationComponent },
  { path: 'signup/owners', component: SignupOwnersComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'estateOwner/home', component: EstateOwnerHomepageComponent, canActivate: [EstateOwnerAuthGuard] },
  { path: 'estate/:id', component: EstateProfileComponent, canActivate: [EstateOwnerAuthGuard] },
  { path: 'estates', component: EstatesComponent, canActivate: [EstateOwnerAuthGuard] },
  { path: 'boats', component: BoatsComponent },
  { path: 'fishing-instructors', component: FishingInstructorsComponent },
  { path: 'instructor/home', component: InstructorAdventuresComponent, canActivate: [InstructorGuard] },
  { path: 'adventure/:id', component: AdventureProfileComponent, canActivate: [InstructorGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'profile', component: OwnerProfileComponent },
  { path: 'shipOwner/home', component: ShipOwnerHomepageComponent },
  { path: 'ship/:id', component: ShipProfileComponent }
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
