package app.repository;

import app.domain.UnavailablePeriod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnavailablePeriodRepository extends JpaRepository<UnavailablePeriod, Integer> {
    List<UnavailablePeriod> findAllByServiceId(int id);
}
