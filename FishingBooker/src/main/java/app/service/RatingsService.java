package app.service;

import app.domain.BookingService;
import app.domain.Rating;
import app.domain.User;
import app.dto.NewRatingDTO;
import app.dto.RatingReviewDTO;
import app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RatingsService {
    private RatingRepository ratingRepository;
    private EmailService emailService;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    private EstateRepository estateRepository;
    @Autowired
    private AdventureRepository adventureRepository;


    @Autowired
    public RatingsService(RatingRepository ratingRepository, EmailService emailService){
        this.ratingRepository = ratingRepository;
        this.emailService = emailService;
    }

    public List<Rating> findRatingsForBookingService(int id) {
        List<Rating> foundRatings = new ArrayList<>();

        for (Rating rating: this.ratingRepository.findAll()
             ) {
                if(rating.getBookingService().getId().equals(id) && !rating.getIsApproved() && rating.getIsReviewed())
                    continue;
                foundRatings.add(rating);
        }
        return foundRatings;
    }

    public double getAvgRatingForBookingService(int serviceId) {
        double avg = 0;
        int num = 0;
        for (Rating rating: this.ratingRepository.findAll()) {
            if(rating.getBookingService().getId().equals(serviceId) && rating.getIsApproved()){
                num++;
                avg += rating.getGivenMark();
            }
        }
        if(num == 0)
            return 0;
        return avg/num;
    }

    public int getNumberOfRatingsForBookingService(int serviceId) {
        int num = 0;
        for (Rating rating: this.ratingRepository.findAll()) {
            if(rating.getBookingService().getId().equals(serviceId) && rating.getIsApproved())
                num++;
        }
        return num;
    }

    public void reviewRating(RatingReviewDTO request) {
        Rating foundRating = this.ratingRepository.getById(request.getRatingId());
        foundRating.setIsApproved(request.getIsApproved());
        foundRating.setIsReviewed(true);
        this.ratingRepository.save(foundRating);
        if(request.getIsApproved())
            notifyOwner(foundRating);
    }

    private void notifyOwner(Rating rating) {
        String mailSubject = "New Rating";
        String mailContent = "Hello,\nNew rating for your service has been submitted." +
                                "\nRating: \""+ rating.getDescription() + "\"(" + rating.getGivenMark() +")\nFishing Booker";
        this.emailService.sendMail(rating.getBookingService().getOwner(), mailSubject, mailContent);
    }

    public void createRating(NewRatingDTO ratingDTO) {
        Rating rating = new Rating();
        rating.setGivenMark(ratingDTO.getGivenMark());
        rating.setDescription(ratingDTO.getDescription());
        rating.setIsReviewed(false);
        rating.setIsApproved(false);

        BookingService service = null;
        int serviceId = ratingDTO.getServiceId();
        if(shipRepository.existsById(serviceId)){
            service = shipRepository.getById((serviceId));
        }
        else if (adventureRepository.existsById(serviceId)){
            service = adventureRepository.getById(serviceId);
        }
        else if (estateRepository.existsById(serviceId)){
            service = estateRepository.getById(serviceId);
        }
        User client = clientRepository.getById(ratingDTO.getClientId());
        rating.setBookingService(service);
        rating.setUser(client);
        ratingRepository.save(rating);
    }
}
