package app.dto;

import javax.validation.constraints.NotNull;
import java.util.Date;

public class DeletionRequestDTO {
    @NotNull
    private Date requestedDate;
    @NotNull(message = "There must be a reason for account deleting!")
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
