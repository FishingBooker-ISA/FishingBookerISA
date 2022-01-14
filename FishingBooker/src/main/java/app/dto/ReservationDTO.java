package app.dto;

import javax.validation.constraints.Future;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class ReservationDTO {
    private int id;
    private Date reservationDate;
    @NotNull(message = "Reservation start date must be entered!")
    @FutureOrPresent(message = "Reservation start date must be in the future or present!")
    private Date reservationStart;
    @NotNull(message = "Reservation end date must be entered!")
    @Future(message = "Reservation end date must be in the future!")
    private Date reservationEnd;
    private boolean isPromo;
    private boolean isCanceled;
    private String additionalEquipment;
    @NotNull(message = "Reservation must have a price!") @Min(value = 1, message = "Price must be larger than 0!")
    private double price;
    @NotNull(message = "Reservation must be assigned to a user!")
    private int userId;
    @NotNull(message = "Reservation must be assigned to a service!")
    private int serviceId;
    private int reportId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(Date reservationDate) {
        this.reservationDate = reservationDate;
    }

    public Date getReservationStart() {
        return reservationStart;
    }

    public void setReservationStart(Date reservationStart) {
        this.reservationStart = reservationStart;
    }

    public Date getReservationEnd() {
        return reservationEnd;
    }

    public void setReservationEnd(Date reservationEnd) {
        this.reservationEnd = reservationEnd;
    }

    public boolean isPromo() {
        return isPromo;
    }

    public void setPromo(boolean promo) {
        isPromo = promo;
    }

    public boolean isCanceled() {
        return isCanceled;
    }

    public void setCanceled(boolean canceled) {
        isCanceled = canceled;
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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    public int getReportId() {
        return reportId;
    }

    public void setReportId(int reportId) {
        this.reportId = reportId;
    }
}
