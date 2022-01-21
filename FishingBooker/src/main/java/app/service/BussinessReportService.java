package app.service;

import app.domain.BookingService;
import app.domain.Rating;
import app.domain.Reservation;
import app.domain.User;
import app.repository.RatingRepository;
import app.repository.ReservationRepository;
import app.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BussinessReportService {
    @Autowired
    UserService userService;
    @Autowired
    ManagingReservationsService reservationsService;
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    DateRangeService dateRangeService;
    @Autowired
    RatingRepository ratingRepository;

    public List<Integer> MonthlyReport(User owner) {
        User currentUser = userService.findByEmail(owner.getEmail());
        List<BookingService> ownersServices = serviceRepository.findByOwnerId(currentUser.getId());
        List<Integer> result = new ArrayList<>();

        List<Reservation> reservationsForTimePeriod;
        for( int i = 0; i < 5; i++) {
            reservationsForTimePeriod = new ArrayList<>();
            LocalDateTime start = LocalDateTime.now().minusMonths(i + 1);
            ZonedDateTime zdt = start.atZone(ZoneId.systemDefault());
            Date startDate = Date.from(zdt.toInstant());
            LocalDateTime end = LocalDateTime.now().minusMonths(i);
            ZonedDateTime zdt1 = end.atZone(ZoneId.systemDefault());
            Date endDate = Date.from(zdt1.toInstant());

            for (BookingService bs: ownersServices) {
                for (Reservation r : reservationRepository.getByBookingServiceId(bs.getId())) {
                    if (dateRangeService.datesOverlap(r.getReservationStart(), r.getReservationEnd(), startDate, endDate))
                        reservationsForTimePeriod.add(r);
                }
            }

            result.add(reservationsForTimePeriod.size());
        }

        return result;
    }

    public List<Integer> YearlyReport(User owner) {
        User currentUser = userService.findByEmail(owner.getEmail());
        List<BookingService> ownersServices = serviceRepository.findByOwnerId(currentUser.getId());
        List<Integer> result = new ArrayList<>();

        List<Reservation> reservationsForTimePeriod;
        for( int i = 0; i < 5; i++) {
            reservationsForTimePeriod = new ArrayList<>();
            LocalDateTime start = LocalDateTime.now().minusYears(i + 1);
            ZonedDateTime zdt = start.atZone(ZoneId.systemDefault());
            Date startDate = Date.from(zdt.toInstant());
            LocalDateTime end = LocalDateTime.now().minusYears(i);
            ZonedDateTime zdt1 = end.atZone(ZoneId.systemDefault());
            Date endDate = Date.from(zdt1.toInstant());

            for (BookingService bs: ownersServices) {
                for (Reservation r : reservationRepository.getByBookingServiceId(bs.getId())) {
                    if (dateRangeService.datesOverlap(r.getReservationStart(), r.getReservationEnd(), startDate, endDate))
                        reservationsForTimePeriod.add(r);
                }
            }

            result.add(reservationsForTimePeriod.size());
        }

        return result;
    }

    public List<Integer> WeeklyReport(User owner) {
        User currentUser = userService.findByEmail(owner.getEmail());
        List<BookingService> ownersServices = serviceRepository.findByOwnerId(currentUser.getId());
        List<Integer> result = new ArrayList<>();

        List<Reservation> reservationsForTimePeriod;
        for( int i = 0; i < 5; i++) {
            reservationsForTimePeriod = new ArrayList<>();
            LocalDateTime start = LocalDateTime.now().minusDays((i + 1)*7);
            ZonedDateTime zdt = start.atZone(ZoneId.systemDefault());
            Date startDate = Date.from(zdt.toInstant());
            LocalDateTime end = LocalDateTime.now().minusWeeks(i*7);
            ZonedDateTime zdt1 = end.atZone(ZoneId.systemDefault());
            Date endDate = Date.from(zdt1.toInstant());

            for (BookingService bs: ownersServices) {
                for (Reservation r : reservationRepository.getByBookingServiceId(bs.getId())) {
                    if (dateRangeService.datesOverlap(r.getReservationStart(), r.getReservationEnd(), startDate, endDate))
                        reservationsForTimePeriod.add(r);
                }
            }

            result.add(reservationsForTimePeriod.size());
        }

        return result;
    }

    public double getAverageRating(User owner) {
        User currentUser = userService.findByEmail(owner.getEmail());
        List<BookingService> ownersServices = serviceRepository.findByOwnerId(currentUser.getId());
        double sum = 0;

        for (BookingService bs: ownersServices) {
            for(Rating r : ratingRepository.getRatingsByBookingServiceId(bs.getId())) {
                sum += r.getGivenMark();
            }
        }

        return sum/ownersServices.size();
    }
}
