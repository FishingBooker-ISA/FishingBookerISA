package app.repository;

import app.domain.ShipNavigationTool;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShipNavigationToolRepository extends JpaRepository<ShipNavigationTool, Integer> {
    ShipNavigationTool getByNameAndShipId(String name, int id);
    List<ShipNavigationTool> getAllByShipId(int id);
}
