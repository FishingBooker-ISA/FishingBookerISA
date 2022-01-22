package app.dto;

import java.util.Date;

public class ClientReservationDTO {
    private Date startDate;
    private Date endDate;
    private String additionalEquipment;
    private double price;
    private int clientId;
    private int serviceId;

    public ClientReservationDTO() {
    }

    public ClientReservationDTO(Date startDate, Date endDate, String additionalEquipment, double price, int clientId, int serviceId) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.additionalEquipment = additionalEquipment;
        this.price = price;
        this.clientId = clientId;
        this.serviceId = serviceId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getAdditionalEquipment() {
        return additionalEquipment;
    }

    public void setAdditionalEquipment(String additionalEquipment) {
        this.additionalEquipment = additionalEquipment;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
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
