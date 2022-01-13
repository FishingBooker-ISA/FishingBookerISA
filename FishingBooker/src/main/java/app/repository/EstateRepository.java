package app.repository;

import app.domain.Estate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EstateRepository extends JpaRepository<Estate, Integer> {
    Estate findEstateByName(String name);
    List<Estate> findByOwnerId(int id);
}
