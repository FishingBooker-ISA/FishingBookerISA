package app.dto;

import javax.validation.constraints.Future;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

public class PromoActionDTO {
    private int id;
    @NotNull @Min(value = 1, message = "Price must be larger than 0!")
    private double pricePerDay;
    @NotNull @Min(value = 1, message = "Duration must be larger than 0!")
    private int durationInDays;
    private boolean isTaken;
    @NotNull @Min(value = 1, message = "Capacity must be larger than 0!")
    private int capacity;
    private String additional;
    @NotNull @FutureOrPresent(message = "Start date must be in the present or future!")
    private Date startDate;
    @NotNull @Future(message = "End date must be in the future!")
    private Date endDate;
    @NotNull
    private int bookingServiceId;
    private List<AdditionalEquipmentDTO> additionalServices;

    public List<AdditionalEquipmentDTO> getAdditionalServices() {
        return additionalServices;
    }

    public void setAdditionalServiceList(List<AdditionalEquipmentDTO> additionalServices) {
        this.additionalServices = additionalServices;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public int getDurationInDays() {
        return durationInDays;
    }

    public void setDurationInDays(int durationInDays) {
        this.durationInDays = durationInDays;
    }

    public boolean isTaken() {
        return isTaken;
    }

    public void setTaken(boolean taken) {
        isTaken = taken;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getAdditional() {
        return additional;
    }

    public void setAdditional(String additional) {
        this.additional = additional;
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

    public int getBookingServiceId() {
        return bookingServiceId;
    }

    public void setBookingServiceId(int bookingServiceId) {
        this.bookingServiceId = bookingServiceId;
    }
}
