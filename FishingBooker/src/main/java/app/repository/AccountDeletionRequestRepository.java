package app.repository;

import app.domain.AccountDeletionRequest;
import app.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountDeletionRequestRepository extends JpaRepository<AccountDeletionRequest, Integer> {
    AccountDeletionRequest findByUser(User user);
}
