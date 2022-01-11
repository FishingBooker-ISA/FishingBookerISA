package app.dto;

import javax.persistence.Column;
import java.util.Date;

public class DeletionRequestDTO {
    private Date requestedDate;
    private String reason;

    public Date getRequestedDate() {
        return requestedDate;
    }

    public void setRequestedDate(Date requestedDate) {
        this.requestedDate = requestedDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
