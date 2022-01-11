package app.repository;

import app.domain.ShipNavigationTool;
import app.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipNavigationToolRepository extends JpaRepository<ShipNavigationTool, Integer> {
}
