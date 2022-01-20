package app.dto;

import app.domain.User;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

public class NewComplaintDTO {

    private String reason;
    private boolean ComplaintOnOwner;
    private int clientId;
    private int serviceId;

    public NewComplaintDTO() {
    }

    public boolean isComplaintOnOwner() {
        return ComplaintOnOwner;
    }

    public void setComplaintOnOwner(boolean complaintOnOwner) {
        ComplaintOnOwner = complaintOnOwner;
    }

    public NewComplaintDTO(String reason, boolean ComplaintOnOwner, int clientId, int serviceId) {
        this.reason = reason;
        this.ComplaintOnOwner = ComplaintOnOwner;
        this.clientId = clientId;
        this.serviceId = serviceId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }



    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }
}
