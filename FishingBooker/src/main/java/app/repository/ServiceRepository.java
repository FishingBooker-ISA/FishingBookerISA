package app.repository;

import app.domain.BookingService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<BookingService, Integer> {
    BookingService findByName(String name);
    List<BookingService> findByOwnerId(int id);
}
