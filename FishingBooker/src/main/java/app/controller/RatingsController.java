package app.controller;

import app.domain.Rating;
import app.dto.NewRatingDTO;
import app.dto.RatingReviewDTO;
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
    private RatingsService ratingsService;

    @GetMapping(value = "/getRatings", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Rating> getAdventuresForInstructor(int id){
        return ratingsService.findRatingsForBookingService(id);
    }

    @PostMapping(value = "/reviewRating", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void reviewRating(@RequestBody RatingReviewDTO request) {
        this.ratingsService.reviewRating(request);
    }

    @PostMapping("/new")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public void createRating(@RequestBody NewRatingDTO ratingDTO) {
        this.ratingsService.createRating(ratingDTO);
    }
    
    @GetMapping(value = "/getAvgRating", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + "|| hasAuthority('ROLE_SHIP_OWNER')" + " || hasAuthority('ROLE_INSTRUCTOR')")
    public double getAvgRating(int serviceId){
        return ratingsService.getAvgRatingForBookingService(serviceId);
    }

}
