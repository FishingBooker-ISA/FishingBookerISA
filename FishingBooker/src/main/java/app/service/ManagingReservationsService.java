package app.service;

import app.domain.BookingService;
import app.domain.PromoAction;
import app.domain.Reservation;
import app.domain.User;
import app.dto.ReservationDTO;
import app.repository.EstateRepository;
import app.repository.ReservationRepository;
import app.repository.ServiceRepository;
import app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class ManagingReservationsService {
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    UserService userService;
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    DateRangeService dateRangeService;
    @Autowired
    EmailService emailService;
    @Autowired
    PromoActionService promoActionService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    EstateRepository estateRepository;


    public List<Reservation> getReservationHistory(int serviceId) {
        BookingService bookingService = serviceRepository.getById(serviceId);
        List<Reservation> existingReservations = new ArrayList<>();

        for (Reservation res : reservationRepository.findAll()) {
            if (res.getBookingService().getId().equals(bookingService.getId()))
                existingReservations.add(res);
        }

        return existingReservations;
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public Reservation createReservationForUser(ReservationDTO reservationDTO) throws Exception {
        User client = userRepository.getById(reservationDTO.getUserId());
        Reservation lastingReservation = getLastingReservationForUser(client, reservationDTO.getServiceId());

        if (lastingReservation == null)
            return null;

        List<Reservation> existingReservations = getReservationHistory(reservationDTO.getServiceId());
        if (checkIfReservationsOverlap(reservationDTO.getReservationStart(), reservationDTO.getReservationEnd(),
                existingReservations)) {
            return null;
        }

        Reservation newReservation = new Reservation();
        newReservation.setReservationStart(reservationDTO.getReservationStart());
        newReservation.setReservationEnd(reservationDTO.getReservationEnd());
        newReservation.setCanceled(false);
        newReservation.setAdditionalEquipment(reservationDTO.getAdditionalEquipment());
        newReservation.setPrice(reservationDTO.getPrice());
        newReservation.setPromo(false);
        BookingService bookingService = serviceRepository.getById(reservationDTO.getServiceId());
        newReservation.setBookingService(bookingService);
        newReservation.setReservedDate(new Date());
        User user = userRepository.getById(reservationDTO.getUserId());
        newReservation.setUser(user);
        reservationRepository.save(newReservation);
        sendConfirmationMail(newReservation);
        return newReservation;
    }

    public Reservation getLastingReservationForUser(User user, int serviceId) {
        List<Reservation> existingReservations = getReservationHistory(serviceId);

        for (Reservation res : existingReservations) {
            if (res.getUser().getId().equals(user.getId()) &&
                    checkIfReservationIsLasting(res.getReservationStart(), res.getReservationEnd())) {
                return res;
            }
        }

        return null;
    }

    private boolean checkIfReservationIsLasting(Date start, Date end) {
        return  (start.compareTo(new Date()) <= 0 && new Date().compareTo(end) <= 0);
    }

    private boolean checkIfReservationsOverlap(Date start, Date end, List<Reservation> existingReservations) {
        for (Reservation reservation : existingReservations) {
            if (dateRangeService.datesOverlap(reservation.getReservationStart(), reservation.getReservationEnd(), start, end)) {
                return true;
            }
        }
        return false;
    }

    private void sendConfirmationMail(Reservation reservation) throws InterruptedException {
        String mailSubject = "Confirmation for reservation of " + reservation.getBookingService().getName();
        String mailContent;
        mailContent = "Hello,\nYour reservation for " + reservation.getBookingService().getType().toString().toLowerCase()
                + " "
                + reservation.getBookingService().getName()
                + " has been made. Enjoy!\n" + reservation.getBookingService().getOwner().getFirstName() + " "
                + reservation.getBookingService().getOwner().getLastName();
        this.emailService.sendMail(reservation.getUser(), mailSubject, mailContent);
    }

    // da li treba provjera za promo???
    public boolean checkIfPeriodIsAvailable(Date start, Date end, int serviceId) {
        List<Reservation> existingReservations = reservationRepository.getByBookingServiceId(serviceId);
        if (checkIfReservationsOverlap(start, end, existingReservations)) {
            return false;
        }

        List<PromoAction> existingActions = promoActionService.getAllActions(serviceId);
        for (PromoAction action : existingActions) {
            if (dateRangeService.datesOverlap(action.getStartDate(), action.getEndDate(), start, end))
                return false;
        }

        return true;
    }
}










