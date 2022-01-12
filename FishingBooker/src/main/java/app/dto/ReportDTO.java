package app.dto;

import java.util.Date;

public class ReportDTO {
    int reportId;
    Date createdOn;
    String reportText;
    int reservationId;
    boolean clientDidntShowUp;
    boolean sanctionClient;

    public boolean getSanctionClient() {
        return sanctionClient;
    }

    public void setSanctionClient(boolean sanctionClient) {
        this.sanctionClient = sanctionClient;
    }

    public boolean getClientDidntShowUp() {
        return clientDidntShowUp;
    }

    public void setClientDidntShowUp(boolean clientDidntShowUp) {
        this.clientDidntShowUp = clientDidntShowUp;
    }

    public int getReportId() {
        return reportId;
    }

    public void setReportId(int reportId) {
        this.reportId = reportId;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public String getReportText() {
        return reportText;
    }

    public void setReportText(String reportText) {
        this.reportText = reportText;
    }

    public int getReservationId() {
        return reservationId;
    }

    public void setReservationId(int reservationId) {
        this.reservationId = reservationId;
    }
}
