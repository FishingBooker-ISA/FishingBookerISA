package app.service;

import app.domain.AccountRequest;
import app.domain.Rating;
import app.domain.User;
import app.dto.RatingReviewDTO;
import app.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RatingsService {
    private RatingRepository ratingRepository;
    private EmailService emailService;

    @Autowired
    public RatingsService(RatingRepository ratingRepository, EmailService emailService){
        this.ratingRepository = ratingRepository;
        this.emailService = emailService;
    }

    public List<Rating> findRatingsForBookingService(int id) {
        List<Rating> foundRatings = new ArrayList<>();

        for (Rating rating: this.ratingRepository.findAll()
             ) {
                if(rating.getBookingService().getId().equals(id))
                    foundRatings.add(rating);
        }
        return foundRatings;
    }

    public void reviewRating(RatingReviewDTO request) throws InterruptedException {
        Rating foundRating = this.ratingRepository.getById(request.getRatingId());
        foundRating.setIsApproved(request.getIsApproved());
        foundRating.setIsReviwed(true);
        this.ratingRepository.save(foundRating);
        if(request.getIsApproved())
            notifyOwner(foundRating);
    }

    private void notifyOwner(Rating rating) throws InterruptedException {
        String mailSubject = "New Rating";
        String mailContent = "Hello,\nNew rating for your service has been submitted." +
                                "\nRating: \""+ rating.getDescription() + "\"(" + rating.getGivenMark() +")\nFishing Booker";
        this.emailService.sendMail(rating.getBookingService().getOwner(), mailSubject, mailContent);
    }
}
