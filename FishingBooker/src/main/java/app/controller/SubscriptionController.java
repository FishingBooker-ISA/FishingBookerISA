package app.controller;

import app.domain.Subscription;
import app.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/subscrptions", produces = MediaType.APPLICATION_JSON_VALUE)
public class SubscriptionController {

    //@Autowired
    //private SubscriptionService subscriptionService;


    @GetMapping("/subscriptons/{id}")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public List<Subscription> verify(@PathVariable int id) {
        return null; //this.subscriptionService.getSubscriptionsForClient(id);
    }
}
