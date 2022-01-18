package app.repository;

import app.domain.Ship;
import app.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShipRepository extends JpaRepository<Ship, Integer> {
    List<Ship> findByOwnerId(int id);
}
