package app.repository;

import app.domain.Report;
import app.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository  extends JpaRepository<Report, Integer> {
    Report getByReservationId(int id);
}
