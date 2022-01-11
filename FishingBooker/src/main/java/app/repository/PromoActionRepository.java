package app.repository;

import app.domain.PromoAction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PromoActionRepository  extends JpaRepository<PromoAction, Integer> {
    List<PromoAction> getAllByBookingServiceId(int id);
}
