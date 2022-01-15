package app.repository;

import app.domain.AdditionalService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdditionalServiceRepository extends JpaRepository<AdditionalService, Integer> {
}
