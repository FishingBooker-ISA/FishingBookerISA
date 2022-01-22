package app.service;

import app.domain.*;
import app.dto.PromoActionDTO;
import app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PromoActionService {
    @Autowired
    private PromoActionRepository promoActionRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    @Autowired
    private UnavailablePeriodRepository unavailablePeriodRepository;
    @Autowired
    private DateRangeService dateRangeService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private AdditionalServiceRepository additionalServiceRepository;

    public List<PromoAction> getAllActions(int serviceId) {
        return promoActionRepository.getAllByBookingServiceId(serviceId);
    }

    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public PromoAction createNewPromoAction(PromoActionDTO actionDTO) {
        if (checkIfDatesOverlap(actionDTO.getStartDate(), actionDTO.getEndDate(), actionDTO.getBookingServiceId())) {
            return null;
        }

        PromoAction newAction = create(new PromoAction(), actionDTO);
        promoActionRepository.save(newAction);
        notifySubscribers(newAction);
        return newAction;
    }

    public PromoAction updateAction(PromoActionDTO actionDTO) {
        PromoAction existingAction = promoActionRepository.getById(actionDTO.getId());

        if ((existingAction.getStartDate().compareTo(actionDTO.getStartDate()) != 0
                || existingAction.getEndDate().compareTo(actionDTO.getEndDate()) != 0)
                && checkIfDatesOverlap(actionDTO.getStartDate(), actionDTO.getEndDate(), actionDTO.getBookingServiceId())) {
            return null;
        }

        PromoAction updatedAction = create(existingAction, actionDTO);
        promoActionRepository.save(updatedAction);
        notifySubscribers(updatedAction);
        return updatedAction;
    }

    public void notifySubscribers(PromoAction action) {
        List<Subscription> subscriptionsForService = subscriptionRepository.findAllByBookingServiceId(action.getBookingService().getId());
        List<User> users = new ArrayList<>();

        for (Subscription sub : subscriptionsForService) {
            users.add(sub.getClient());
        }

        for (User user : users) {
            String mailSubject = "New promo action for " + action.getBookingService().getName();
            String mailContent;
            mailContent = "New promo action for " + action.getBookingService().getName() + " has been added!\n"
                    + "Promo action details: \n"
                    + "Price per day: " + action.getPricePerDay() + "\n"
                    + "Capacity: " + action.getCapacity() + "\n"
                    + "Start: " + action.getStartDate() + "\n"
                    + "End: " + action.getEndDate() + "\n"
                    + "The action will last for: " + action.getDurationInDays() + " days\n\n"
                    + "For more details please refer to our profile on FishingBooker!";
            this.emailService.sendMail(user, mailSubject, mailContent);
        }

    }

    private PromoAction create(PromoAction action, PromoActionDTO actionDTO) {
        BookingService service = serviceRepository.getById(actionDTO.getBookingServiceId());
        action.setPricePerDay(actionDTO.getPricePerDay());
        action.setDurationInDays(actionDTO.getDurationInDays());
        action.setBookingService(service);
        action.setCapacity(actionDTO.getCapacity());
        action.setAdditional(actionDTO.getAdditional());
        action.setStartDate(actionDTO.getStartDate());
        action.setEndDate(actionDTO.getEndDate());
        action.setIsTaken(false);

        List<AdditionalService> existingServices = additionalServiceRepository
                .getAllByBookingServiceId(actionDTO.getBookingServiceId());
        List<AdditionalService> addedServices = new ArrayList<>();

        for (var a : actionDTO.getAdditionalServices()) {
            for (var existing : existingServices) {
                if (existing.getId().equals(a.getId()))
                    addedServices.add(new AdditionalService(a.getId(), a.getName(), a.getPrice(), service));
            }
        }

        action.setAdditionalServices(addedServices);
        promoActionRepository.save(action);
        return action;
    }

    public boolean checkIfDatesOverlap(Date start, Date end, int serviceId) {
        List<Reservation> existingReservations = reservationRepository.findLockedByBookingServiceId(serviceId);
        List<PromoAction> existingActions = promoActionRepository.getAllByBookingServiceId(serviceId);
        List<UnavailablePeriod> unavailablePeriods = unavailablePeriodRepository.findAllByServiceId(serviceId);

        for (Reservation reservation : existingReservations) {
            if (dateRangeService.datesOverlap(reservation.getReservationStart(), reservation.getReservationEnd(), start, end)) {
                return true;
            }
        }

        for (PromoAction action : existingActions) {
            if (dateRangeService.datesOverlap(action.getStartDate(), action.getEndDate(), start, end)) {
                return true;
            }
        }

        for (UnavailablePeriod period : unavailablePeriods) {
            if (dateRangeService.datesOverlap(period.getStartDate(), period.getEndDate(),
                    start, end)) {
                return true;
            }
        }

        return false;
    }
}
