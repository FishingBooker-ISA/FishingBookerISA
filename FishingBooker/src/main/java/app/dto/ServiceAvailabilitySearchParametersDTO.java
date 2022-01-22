package app.dto;

import java.util.Date;

public class ServiceAvailabilitySearchParametersDTO {
    private Date startDate;
    private Date endDate;
    private int capacity;

    public ServiceAvailabilitySearchParametersDTO(Date startDate, Date endDate, int capacity) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.capacity = capacity;
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

    public ServiceAvailabilitySearchParametersDTO() {
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
}
