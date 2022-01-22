package app.dto;


public class NewComplaintDTO {

    private String reason;
    private boolean complaintOnOwner;
    private int clientId;
    private int serviceId;

    public NewComplaintDTO() {
    }

    public boolean isComplaintOnOwner() {
        return complaintOnOwner;
    }

    public void setComplaintOnOwner(boolean complaintOnOwner) {
        this.complaintOnOwner = complaintOnOwner;
    }

    public NewComplaintDTO(String reason, boolean complaintOnOwner, int clientId, int serviceId) {
        this.reason = reason;
        this.complaintOnOwner = complaintOnOwner;
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
