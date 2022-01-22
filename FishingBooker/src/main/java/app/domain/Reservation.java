package app.domain;

import app.dto.ClientReservationDTO;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private Date reservedDate;
    @Column(nullable = false)
    private Date reservationStart;
    @Column(nullable = false)
    private Date reservationEnd;
    @Column(nullable = false)
    private boolean isPromo;
    @Column(nullable = false)
    private boolean isCanceled;
    @Column(nullable = false)
    private String additionalEquipment;
    @Column(nullable = false)
    private double price;
    @Column(nullable = true)
    private ShipOwnerRole shipOwnerRole;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "service_id")
    private BookingService bookingService;

    public Reservation() {
    }

    public Reservation(Integer id, Date reservedDate) {
        this.id = id;
        this.reservedDate = reservedDate;
    }

    public Reservation(ClientReservationDTO dto) {
        this.reservedDate = new Date();
        this.reservationStart = dto.getStartDate();
        this.reservationEnd = dto.getEndDate();
        this.isPromo = false;
        this.isCanceled = false;
        this.additionalEquipment = dto.getAdditionalEquipment();
        this.price = dto.getPrice();
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getReservedDate() {
        return reservedDate;
    }

    public void setReservedDate(Date reservedDate) {
        this.reservedDate = reservedDate;
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

    public ShipOwnerRole getShipOwnerRole() {
        return shipOwnerRole;
    }

    public void setShipOwnerRole(ShipOwnerRole shipOwnerRole) {
        this.shipOwnerRole = shipOwnerRole;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BookingService getBookingService() {
        return bookingService;
    }

    public void setBookingService(BookingService bookingService) {
        this.bookingService = bookingService;
    }

}
