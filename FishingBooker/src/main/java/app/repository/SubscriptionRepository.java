package app.repository;

import app.domain.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscriptionRepository  extends JpaRepository<Subscription, Integer> {
    List<Subscription> findAllByBookingServiceId(int id);
    List<Subscription> findAllByClientId(int id);
}
