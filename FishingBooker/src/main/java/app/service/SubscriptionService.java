package app.service;

import app.domain.Subscription;
import app.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public List<Subscription> getSubscriptionsForClient(int clientId){
        return this.subscriptionRepository.findAllByClientId(clientId);
    }
}
