package app.repository;

import app.domain.OwnerMoney;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerMoneyRepository  extends JpaRepository<OwnerMoney, Integer> {
}
