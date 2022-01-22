package app.service;

import app.domain.*;
import app.dto.ClientReservationDTO;
import app.dto.ReservationDTO;
import app.dto.UnavailablePeriodDTO;
import app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class ManagingReservationsService {
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    UserService userService;
    @Autowired
    ClientService clientService;
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
    PromoActionRepository actionRepository;
    @Autowired
    EstateRepository estateRepository;
    @Autowired
    UnavailablePeriodRepository unavailablePeriodRepository;
    @Autowired
    MoneyService moneyService;

    public boolean cancelReservation(int id){
        Reservation r = reservationRepository.getById(id);
        Date now = new Date();
        long diff = r.getReservationStart().getTime() - now.getTime();
        TimeUnit time = TimeUnit.DAYS;
        long days = time.convert(diff, TimeUnit.MILLISECONDS);
        if(days<3){
            return false;
        }
        r.setCanceled(true);
        reservationRepository.save(r);
        return true;
    }

    public List<Reservation> getReservationHistory(int serviceId) {
        BookingService bookingService = serviceRepository.getById(serviceId);
        List<Reservation> existingReservations = new ArrayList<>();

        for (Reservation res : reservationRepository.findAll()) {
            if (res.getBookingService().getId().equals(bookingService.getId()))
                existingReservations.add(res);
        }

        return existingReservations;
    }

    public List<Reservation> getClientReservationHistory(int clientId) {
        List<Reservation> reservations = new ArrayList<>();
        Date now = new Date();
        for (Reservation res : reservationRepository.getByUserId(clientId)) {
            if(res.getReservationStart().before(now))
                reservations.add(res);
        }
        return reservations;
    }

    public List<Reservation> getClientUpcomingReservations(int clientId) {
        List<Reservation> reservations = new ArrayList<>();
        Date now = new Date();
        for (Reservation res : reservationRepository.getByUserId(clientId)) {
            if(res.getReservationStart().after(now))
                reservations.add(res);
        }
        return reservations;
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
    public Reservation createReservationForUser(ReservationDTO reservationDTO) throws Exception {
        User client = userRepository.getById(reservationDTO.getUserId());
        Reservation lastingReservation = getLastingReservationForUser(client, reservationDTO.getServiceId());
        Reservation newReservation = getReservation(reservationDTO);
        if (lastingReservation == null)
            return null;

        if (!checkIfServiceIsAvailable(reservationDTO.getReservationStart(), reservationDTO.getReservationEnd(),
                reservationDTO.getServiceId())) {
            return null;
        }

        newReservation.setPrice(this.moneyService.applyClientDiscount(client.getId(), newReservation.getPrice()));
        reservationRepository.save(newReservation);
        sendConfirmationMail(newReservation);
        this.moneyService.manageMoneyForNewReservation(newReservation);
        this.moneyService.managePointsForNewReservation(newReservation);
        return newReservation;
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
    public Reservation createReservationForClient(ClientReservationDTO reservationDTO) {
        try{
            User client = userRepository.getById(reservationDTO.getClientId());
            BookingService bookingService = serviceRepository.getById(reservationDTO.getServiceId());
            if (!checkIfServiceIsAvailable(reservationDTO.getStartDate(), reservationDTO.getEndDate(), reservationDTO.getServiceId()))
                return null;
            if (!checkIfClientCanMakeReservation(reservationDTO.getStartDate(), reservationDTO.getEndDate(), reservationDTO.getServiceId(), reservationDTO.getClientId()))
                return null;

            Reservation newReservation = new Reservation(reservationDTO);
            newReservation.setUser(client);
            newReservation.setBookingService(bookingService);
            newReservation.setShipOwnerRole(bookingService.getOwner().getShipOwnerRole());
            newReservation.setPrice(this.moneyService.applyClientDiscount(reservationDTO.getClientId(), newReservation.getPrice()));
            this.moneyService.manageMoneyForNewReservation(newReservation);
            this.moneyService.managePointsForNewReservation(newReservation);

            reservationRepository.save(newReservation);
            sendConfirmationMail(newReservation);
            return newReservation;
        } catch (Exception e){
            System.out.println("Service unavailable: pessimistic lock");
        }
        return null;
    }

    @Transactional
    public boolean makeActionReservation(int actionId, int clientId) {
        try {
            PromoAction action = actionRepository.getActionByIdLock(actionId);
            if(action.getIsTaken())
                return false;
            if (!checkIfClientCanMakeReservation(action.getStartDate(), action.getEndDate(), action.getBookingService().getId(), clientId))
                return false;

            Reservation newReservation = new Reservation(action);

            newReservation.setUser(userRepository.getById(clientId));
            newReservation.setBookingService(action.getBookingService());
            newReservation.setShipOwnerRole(action.getBookingService().getOwner().getShipOwnerRole());
            this.moneyService.manageMoneyForNewReservation(newReservation);
            this.moneyService.managePointsForNewReservation(newReservation);
            action.setIsTaken(true);
            reservationRepository.save(newReservation);
            this.actionRepository.save(action);
            sendConfirmationMail(newReservation);

            return true;
        } catch (Exception e) {
            System.out.println("Action unavailable: pessimistic lock");
        }
        return false;
    }

    private boolean checkIfClientCanMakeReservation(Date startDate, Date endDate, int serviceId, int clientId) {
        int p = clientService.getPenaltiesNumber(clientId);
        if (p >= 3)
            return false;
        List<Reservation> reservationsOfInterest = new ArrayList<>();
        for (Reservation res : reservationRepository.getByUserId(clientId)) {
            if(!res.isCanceled() || (res.isCanceled() && serviceId == res.getBookingService().getId()))
                reservationsOfInterest.add(res);
        }
        return !checkIfReservationsOverlap(startDate, endDate, reservationsOfInterest);
    }

    private Reservation getReservation(ReservationDTO reservationDTO) {
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

    public UnavailablePeriod addUnavailablePeriod(UnavailablePeriodDTO dto) {
        UnavailablePeriod unavailable = new UnavailablePeriod();
        BookingService service = serviceRepository.getById(dto.getServiceId());

        if (!checkIfPeriodIsAvailable(dto.getStart(), dto.getEnd(), dto.getServiceId()) ||
            dto.getStart().before(new Date()) || !checkIfActionsOverlap(dto.getStart(), dto.getEnd(), dto.getServiceId())) {
            return null;
        }

        unavailable.setStartDate(dto.getStart());
        unavailable.setEndDate(dto.getEnd());
        unavailable.setService(service);
        unavailablePeriodRepository.save(unavailable);
        return unavailable;
    }

    private boolean checkIfReservationIsLasting(Date start, Date end) {
        return (start.compareTo(new Date()) <= 0 && new Date().compareTo(end) <= 0);
    }

    private boolean checkIfReservationsOverlap(Date start, Date end, List<Reservation> existingReservations) {
        for (Reservation reservation : existingReservations) {
            if (dateRangeService.datesOverlap(reservation.getReservationStart(), reservation.getReservationEnd(), start, end)) {
                return true;
            }
        }
        return false;
    }

    private void sendConfirmationMail(Reservation reservation) {
        String mailSubject = "Confirmation for reservation of " + reservation.getBookingService().getName();
        String mailContent;
        mailContent = "Hello,\nYour reservation for " + reservation.getBookingService().getType().toString().toLowerCase()
                + " "
                + reservation.getBookingService().getName()
                + " has been made. Enjoy!\n" + reservation.getBookingService().getOwner().getFirstName() + " "
                + reservation.getBookingService().getOwner().getLastName();
        this.emailService.sendMail(reservation.getUser(), mailSubject, mailContent);
    }

    public boolean checkIfPeriodIsAvailable(Date start, Date end, int serviceId) {
        List<Reservation> existingReservations = reservationRepository.findLockedByBookingServiceId(serviceId);
        if (checkIfReservationsOverlap(start, end, existingReservations)) {
            return false;
        }

        List<UnavailablePeriod> unavailablePeriods = unavailablePeriodRepository.findAllByServiceId(serviceId);
        for (UnavailablePeriod period : unavailablePeriods) {
            if (dateRangeService.datesOverlap(period.getStartDate(), period.getEndDate(), start, end)) {
                return false;
            }
        }

        return true;
    }

    private boolean checkIfActionsOverlap(Date start, Date end, int serviceId) {
        List<PromoAction> existingActions = promoActionService.getAllActions(serviceId);
        for (PromoAction action : existingActions) {
            if (dateRangeService.datesOverlap(action.getStartDate(), action.getEndDate(), start, end)) {
                return false;
            }
        }
        return true;
    }

    public boolean checkIfServiceIsAvailable(Date start, Date end, int serviceId) {
        return (checkIfPeriodIsAvailable(start, end, serviceId) && checkIfActionsOverlap(start, end, serviceId));
    }

    public User getClientForReservation(int serviceId) {
        List<Reservation> allReservations = this.reservationRepository.getByBookingServiceId(serviceId);
        for (Reservation reservation: allReservations
             ) {
                if(checkIfReservationIsLasting(reservation.getReservationStart(), reservation.getReservationEnd()))
                {
                    return reservation.getUser();
                }
        }
        return null;
    }
    public  List<Reservation> getReservationsForService(int serviceId) {
      return this.reservationRepository.getByBookingServiceId(serviceId);
    }

    public boolean hasAnyReservations(int bookingServiceId) {
        List<Reservation> reservations = getReservationsForService(bookingServiceId);

        for (Reservation reservation:
                reservations) {
            if((reservation.getReservationEnd().compareTo(new Date())) >= 0)
                return true;
        }
        return false;
    }


}











