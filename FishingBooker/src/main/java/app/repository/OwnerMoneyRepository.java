package app.repository;

import app.domain.OwnerMoney;
import app.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OwnerMoneyRepository  extends JpaRepository<OwnerMoney, Integer> {
    List<OwnerMoney> getOwnerMoneyByOwner(User user);
}
