package app.service;

import app.domain.Client;
import app.domain.Report;
import app.domain.Reservation;
import app.dto.ReportDTO;
import app.repository.ClientRepository;
import app.repository.ReportRepository;
import app.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class ReportService {
    @Autowired
    ReportRepository reportRepository;
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    ClientRepository clientRepository;

    public List<Report> getReportsForReservation(int reservationId) {
        Reservation reservation = reservationRepository.getById(reservationId);
        return reportRepository.findAllByReservation(reservation);
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public Report createReport(ReportDTO reportDTO){
        Report newReport = new Report();
        Reservation reservation = reservationRepository.getById(reportDTO.getReservationId());
        Client client = clientRepository.getById(reservation.getUser().getId());

        if (reservation.getReport() != null)
            return null;

        newReport.setCreatedOn(reportDTO.getCreatedOn());
        newReport.setReservation(reservation);
        newReport.setText(reportDTO.getReportText());

        if(reportDTO.getClientDidntShowUp()){
            int currNumOfPenalties = client.getNumOfPenalties();
            client.setNumOfPenalties(currNumOfPenalties + 1);
            clientRepository.save(client);
        }

        if(reportDTO.getSanctionClient()) {
            newReport.setVerified(false);
        }

        newReport.setVerified(true);
        newReport.setCreatedOn(new Date());
        newReport.setClientDidntShowUp(reportDTO.getClientDidntShowUp());
        reportRepository.save(newReport);
        return newReport;
    }
}
