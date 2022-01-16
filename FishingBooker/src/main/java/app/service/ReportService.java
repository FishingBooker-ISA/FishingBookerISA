package app.service;

import app.domain.Client;
import app.domain.Report;
import app.domain.Reservation;
import app.dto.ReportDTO;
import app.dto.ReportReviewDTO;
import app.repository.ClientRepository;
import app.repository.ReportRepository;
import app.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    @Autowired
    EmailService emailService;

    public List<Report> getReportsForReservation(int reservationId) {
        Reservation reservation = reservationRepository.getById(reservationId);
        return reportRepository.findAllByReservation(reservation);
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public Report createReport(ReportDTO reportDTO) {
        Report newReport = new Report();
        Reservation reservation = reservationRepository.getById(reportDTO.getReservationId());
        Client client = clientRepository.getById(reservation.getUser().getId());

        if (reservation.getReport() != null)
            return null;

        newReport.setCreatedOn(reportDTO.getCreatedOn());
        newReport.setReservation(reservation);
        newReport.setText(reportDTO.getReportText());

        if (reportDTO.getClientDidntShowUp()) {
            int currNumOfPenalties = client.getNumOfPenalties();
            client.setNumOfPenalties(currNumOfPenalties + 1);
            clientRepository.save(client);
        }

        if (reportDTO.getSanctionClient()) {
            newReport.setIsReviewed(false);
        }

        newReport.setIsReviewed(true);
        newReport.setCreatedOn(new Date());
        newReport.setClientDidntShowUp(reportDTO.getClientDidntShowUp());
        reportRepository.save(newReport);
        return newReport;
    }

    public List<Report> getReportsToConsider() {
        List<Report> allReports = this.reportRepository.findAll();
        List<Report> reportsToConsider = new ArrayList<>();
        for (Report report :
                allReports) {
            if (!report.getIsReviewed() && report.getSanctionClient())
                reportsToConsider.add(report);
        }

        return reportsToConsider;
    }

    public void reviewReport(ReportReviewDTO review) {
        Report foundReport = this.reportRepository.getById(review.getId());
        foundReport.setIsReviewed(true);
        if (review.getIsSanctioned()) {
            Client client = this.clientRepository.getById(foundReport.getReservation().getUser().getId());
            int penalties = client.getNumOfPenalties() + 1;
            client.setNumOfPenalties(penalties);
            this.clientRepository.save(client);
            notifyClient(foundReport);
            notifyOwner(foundReport);
        }
    }

    private void notifyOwner(Report report) {
        String mailSubject = "Report Review";
        String mailContent = "Hello,\nYour report has been reviewed." +
                "\nWe have sanctioned user: \"" + report.getReservation().getUser().getFirstName()
                + "\"(" + report.getReservation().getUser().getLastName() + "\nFishing Booker";
        this.emailService.sendMail(report.getReservation().getBookingService().getOwner(), mailSubject, mailContent);
    }

    private void notifyClient(Report report) {
        String mailSubject = "Report Review";
        String mailContent = "Hello,\nAfter reviewing report from " + report.getReservation().getBookingService().getOwner().getFirstName() +
                report.getReservation().getBookingService().getOwner().getLastName() +
                "\nWhere he stated: \"" + report.getText() + "\", we decided to give you penalty."
                +"\nFishing Booker";
        this.emailService.sendMail(report.getReservation().getUser(), mailSubject, mailContent);
    }
}
