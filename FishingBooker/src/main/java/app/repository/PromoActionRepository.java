package app.repository;

import app.domain.PromoAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;
import java.util.List;

public interface PromoActionRepository  extends JpaRepository<PromoAction, Integer> {
    List<PromoAction> getAllByBookingServiceId(int id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM PromoAction a WHERE a.id = :id")
    @QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value = "1000")})
    PromoAction getActionByIdLock(int id);

}
