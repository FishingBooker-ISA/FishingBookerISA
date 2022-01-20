package app.repository;

import app.domain.AppMoney;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppMoneyRepository extends JpaRepository<AppMoney, Integer> {
}
