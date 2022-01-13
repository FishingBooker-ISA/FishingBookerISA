package app.controller;

import app.domain.Rating;
import app.dto.RatingReviewDTO;
import app.repository.RatingRepository;
import app.service.RatingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/ratings")
public class RatingsController {
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private RatingsService ratingsService;

    @GetMapping(value = "/getRatings", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Rating> getAdventuresForInstructor(int id){
        return ratingsService.findRatingsForBookingService(id);
    }

    @PostMapping(value = "/reviewRating", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void reviewRating(@RequestBody RatingReviewDTO request) throws InterruptedException {
        this.ratingsService.reviewRating(request);
    }

}
