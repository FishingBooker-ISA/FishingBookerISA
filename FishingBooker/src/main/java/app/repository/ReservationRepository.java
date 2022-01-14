package app.repository;

import app.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository  extends JpaRepository<Reservation, Integer> {
    List<Reservation> getByBookingServiceId(int serviceId);
}
