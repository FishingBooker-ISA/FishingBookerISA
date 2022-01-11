package app.service;

import app.domain.PromoAction;
import app.repository.PromoActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromoActionService {
    @Autowired
    PromoActionRepository actionRepository;

    public List<PromoAction> getAllActions(int serviceId) {
        return actionRepository.getAllByBookingServiceId(serviceId);
    }
}
