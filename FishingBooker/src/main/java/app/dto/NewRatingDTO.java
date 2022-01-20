package app.dto;

public class NewRatingDTO {
    private double givenMark;
    private String description;
    private int clientId;
    private int serviceId;

    public NewRatingDTO() {
    }

    public double getGivenMark() {
        return givenMark;
    }

    public void setGivenMark(double givenMark) {
        this.givenMark = givenMark;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
