package app.repository;

import app.domain.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository  extends JpaRepository<Complaint, Integer> {
}
