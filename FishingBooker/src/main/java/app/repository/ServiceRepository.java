package app.repository;

import app.domain.BookingService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;
import java.util.List;

public interface ServiceRepository extends JpaRepository<BookingService, Integer> {
    BookingService findByName(String name);
    List<BookingService> findByOwnerId(int id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM BookingService s WHERE s.id = :id")
    @QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value = "1000")})
    BookingService getServiceByIdLock(int id);
}
