package app.controller;

import app.domain.Subscription;
import app.dto.SubscriptionDTO;
import app.service.RatingsService;
import app.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/subscriptions", produces = MediaType.APPLICATION_JSON_VALUE)
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;
    @Autowired
    private RatingsService ratingsService;


    @GetMapping("/{id}")
        @PreAuthorize("hasAuthority('ROLE_CLIENT')")
        public List<SubscriptionDTO> getSubscriptions(@PathVariable int id) {
            List<Subscription> subscriptions = this.subscriptionService.getSubscriptionsForClient(id);
            List<SubscriptionDTO> result = new ArrayList<>();
            for(Subscription subscription: subscriptions){
                SubscriptionDTO s = new SubscriptionDTO(subscription.getId(), subscription.getService(), ratingsService.getAvgRatingForBookingService(subscription.getService().getId()), ratingsService.getNumberOfRatingsForBookingService(subscription.getService().getId()));
                result.add(s);
            }
            return result;
    }

    @PostMapping("/new")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public void subscribe(int serviceId, int userId) {
        this.subscriptionService.subscribe(serviceId, userId);
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public void unsubscribe(int serviceId, int userId) {
        this.subscriptionService.unsubscribe(serviceId, userId);
    }

    @GetMapping("/exists")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public boolean checkifSubscribed(int serviceId, int userId) {
        return this.subscriptionService.checkIfSubscribed(serviceId, userId);
    }

}
