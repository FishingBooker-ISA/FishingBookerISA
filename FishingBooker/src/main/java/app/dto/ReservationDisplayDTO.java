package app.dto;

import app.domain.Address;
import app.domain.Reservation;
import app.domain.ServiceType;

import java.util.Date;
import java.util.concurrent.TimeUnit;

public class ReservationDisplayDTO {
    private Integer id;
    private Integer serviceId;
    private ServiceType serviceType;
    private String serviceName;
    private double totalPrice;
    private String additionalServices;
    private int capacity;
    private boolean isCanceled;
    private Date startDate;
    private Date endDate;
    private long durationInHours;

    public ReservationDisplayDTO(Reservation res) {
        this.id = res.getId();
        this.serviceId = res.getBookingService().getId();
        this.serviceType = res.getBookingService().getType();
        this.serviceName = res.getBookingService().getName();
        this.totalPrice = res.getPrice();
        this.additionalServices = res.getAdditionalEquipment();
        this.capacity = res.getBookingService().getCapacity();
        this.isCanceled = res.isCanceled();
        this.startDate = res.getReservationStart();
        this.endDate = res.getReservationEnd();
        long diff = endDate.getTime() - startDate.getTime();
        TimeUnit time = TimeUnit.HOURS;
        this.durationInHours = time.convert(diff, TimeUnit.MILLISECONDS);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public ServiceType getServiceType() {
        return serviceType;
    }

    public void setServiceType(ServiceType serviceType) {
        this.serviceType = serviceType;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getAdditionalServices() {
        return additionalServices;
    }

    public void setAdditionalServices(String additionalServices) {
        this.additionalServices = additionalServices;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public boolean isCanceled() {
        return isCanceled;
    }

    public void setCanceled(boolean canceled) {
        isCanceled = canceled;
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

    public long getDurationInHours() {
        return durationInHours;
    }

    public void setDurationInHours(long durationInHours) {
        this.durationInHours = durationInHours;
    }
}
