package app.service;

import app.domain.BookingService;
import app.domain.Subscription;
import app.domain.User;
import app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private AdventureRepository adventureRepository;
    @Autowired
    private EstateRepository estateRepository;
    @Autowired
    private ShipRepository shipRepository;

    public List<Subscription> getSubscriptionsForClient(int clientId){
        return this.subscriptionRepository.findAllByClientId(clientId);
    }

    public void subscribe(int serviceId, int clientId){
        BookingService service = null;
        if(shipRepository.existsById(serviceId)){
            service = shipRepository.getById((serviceId));
        }
        else if (adventureRepository.existsById(serviceId)){
            service = adventureRepository.getById(serviceId);
        }
        else if (estateRepository.existsById(serviceId)){
            service = estateRepository.getById(serviceId);
        }
        User client = clientRepository.getById(clientId);
        Subscription s = new Subscription(client, service);
        this.subscriptionRepository.save(s);
    }

    public void unsubscribe(int serviceId, int clientId){
        List<Subscription> subscriptions = this.subscriptionRepository.findAllByClientId(clientId);
        for (Subscription s : subscriptions){
            if(s.getService().getId() == serviceId)
                this.subscriptionRepository.delete(s);
        }
    }

    public boolean checkIfSubscribed(int serviceId, int clientId){
        List<Subscription> subscriptions = this.subscriptionRepository.findAllByClientId(clientId);
        for (Subscription s : subscriptions){
            if(s.getService().getId() == serviceId)
                return true;
        }
        return false;
    }
}
