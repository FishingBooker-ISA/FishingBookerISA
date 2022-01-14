package app.dto;

import javax.validation.constraints.NotNull;
import java.util.Date;

public class DeletionRequestDTO {
    @NotNull
    private Date requestedDate;
    @NotNull(message = "There must be a reason for account deleting!")
    private String reason;
    private int userId;

    public int getUserId() { return userId; }

    public void setUserId(int userId) { this.userId = userId; }

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
