package app.repository;

import app.domain.AdditionalService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdditionalServiceRepository extends JpaRepository<AdditionalService, Integer> {
    AdditionalService getByBookingServiceIdAndName(int id, String name);
    List<AdditionalService> getAllByBookingServiceId(int id);
}
