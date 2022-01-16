package app.repository;

import app.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository  extends JpaRepository<Report, Integer> {
    Report getByReservationId(int id);
}
