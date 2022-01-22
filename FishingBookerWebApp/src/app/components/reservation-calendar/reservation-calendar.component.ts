import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/angular';
import { PromoAction } from 'src/app/model/action';
import { Estate } from 'src/app/model/estate';
import { Reservation } from 'src/app/model/reservation';
import { UnavailablePeriod, UnavailablePeriodDTO } from 'src/app/model/unavailable-period';
import { PromoActionsService } from 'src/app/services/promo-actions.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { DetailsDialogComponent, UserDetails } from './details-dialog/details-dialog.component';
import { UnavailablePeriodDialogComponent, UnavailablePeriodDialogModel } from './unavailable-period-dialog/unavailable-period-dialog.component';

@Component({
  selector: 'app-reservation-calendar',
  templateUrl: './reservation-calendar.component.html',
  styleUrls: ['./reservation-calendar.component.css']
})
export class ReservationCalendarComponent implements OnInit {
  @Input()
  id!: number
  @Input()
  calendarView!: boolean

  actions = [] as PromoAction[]
  reservations = [] as Reservation[]
  unavailable = [] as UnavailablePeriod[]
  displayEvents = [] as EventInput[]
  isOwner: boolean = false;

  calendarOptions!: CalendarOptions;

  constructor(public actionsService: PromoActionsService, public reservationService: ReservationsService,
    public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllPromoActions();
    this.getAllReservations();
    this.getAllUnavailable();

    setTimeout(() => {
      this.loadCalendar()
    }, 1000)
  }

  handleDateClick(clickInfo: EventClickArg) {
    if(!this.isOwner)
      return;
    if (clickInfo.event.title !== "Unavailable period") {
      var akcija = new PromoAction()
      var rezervacija = new Reservation()

      for (let a of this.actions) {
        if (new Date(a.startDate).getTime() === clickInfo.event.start?.getTime()
          && new Date(a.endDate).getTime() === clickInfo.event.end?.getTime()) {
          akcija = a
          break;
        }
      }

      for (let r of this.reservations) {
        if (new Date(r.reservationStart).getTime() === clickInfo.event.start?.getTime()
          && new Date(r.reservationEnd).getTime() === clickInfo.event.end?.getTime()) {
          rezervacija = r
          break;
        }
      }

      const dialogData = new UserDetails(
        akcija, rezervacija
      );

      const dialogRef = this.dialog.open(DetailsDialogComponent, {
        maxWidth: '800px',
        data: dialogData,
      });
    }
  }

  addUnavailable() {
    const dialogData = new UnavailablePeriodDialogModel(
      new UnavailablePeriodDTO()
    );

    const dialogRef = this.dialog.open(UnavailablePeriodDialogComponent, {
      maxWidth: '800px',
      width: '430px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult != null) {
        let dto: UnavailablePeriodDTO = {
          start: dialogResult.start,
          end: dialogResult.end,
          serviceId: this.id
        }

        this.reservationService.addUnavailablePeriod(dto).subscribe(
          (data) => {
            this._snackBar.open("Successfully updated!", 'Dissmiss', {
              duration: 3000
            });

            window.location.reload();
          },
          (error) => {
            this._snackBar.open("Entered dates overlap with other reservations or promo actions!", 'Dissmiss', {
              duration: 3000
            });
          });;
      }
    })
  }

  getAllPromoActions() {
    this.actionsService.getAllActionsForService(this.id).subscribe((data) => {
      this.actions = data

      for (let a of this.actions) {
        var start = new Date(a.startDate);
        var end = new Date(a.endDate);
        this.displayEvents.push({
          title: 'Promo action',
          start: start.toISOString(), end: end.toISOString(),
          color: '#81b29a'
        })
      }
    });
  }

  getAllReservations() {
    this.reservationService.getAllReservationsForService(this.id).subscribe((data) => {
      this.reservations = data

      for (let r of this.reservations) {
        var start = new Date(r.reservationStart);
        var end = new Date(r.reservationEnd);
        this.displayEvents.push({
          title: 'Reservation',
          start: start.toISOString(), end: end.toISOString(),
          color: '#3d405b'
        })
      }
    });
  }

  getAllUnavailable() {
    this.reservationService.getAllUnavailablePeriods(this.id).subscribe((data) => {
      this.unavailable = data

      for (let r of this.unavailable) {
        var start = new Date(r.startDate);
        var end = new Date(r.endDate);
        this.displayEvents.push({
          title: 'Unavailable period',
          start: start.toISOString(), end: end.toISOString(),
          color: '#c8553d'
        })
      }
    });
  }

  loadCalendar() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      events: this.displayEvents,
      weekends: true,
      displayEventTime: false,
      editable: false,
      selectable: false,
      firstDay: 1,
      eventClick: this.handleDateClick.bind(this),
    };
  }

}
