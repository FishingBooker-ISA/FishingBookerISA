package app.repository;

import app.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;
import java.util.List;

public interface ReservationRepository  extends JpaRepository<Reservation, Integer> {
    List<Reservation> getByBookingServiceId(int serviceId);
    List<Reservation> getByUserId(int clientId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value ="2000")})
    List<Reservation> findLockedByBookingServiceId(int serviceId);
}
