package app.repository;

import app.domain.AccountRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationReasonRepository extends JpaRepository<AccountRequest, Integer> {
}
