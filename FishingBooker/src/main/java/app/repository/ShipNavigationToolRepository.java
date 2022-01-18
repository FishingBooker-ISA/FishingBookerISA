package app.repository;

import app.domain.ShipNavigationTool;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipNavigationToolRepository extends JpaRepository<ShipNavigationTool, Integer> {
    ShipNavigationTool getByNameAndShipId(String name, int id);
}
