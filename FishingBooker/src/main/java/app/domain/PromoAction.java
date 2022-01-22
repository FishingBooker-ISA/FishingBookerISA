package app.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class PromoAction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private double pricePerDay;
    @Column(nullable = false)
    private int durationInDays;
    @Column(nullable = false)
    private boolean isTaken;
    @Column(nullable = false)
    private int capacity;
    @Column(nullable = false)
    private String additional;
    @Column(nullable = false)
    private Date startDate;
    @Column(nullable = false)
    private Date endDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "action_addedservice",
            joinColumns = @JoinColumn(name = "action_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "additional_id", referencedColumnName = "id"))
    private List<AdditionalService> additionalServices;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "service_id")
    private BookingService bookingService;

    public PromoAction() {
    }

    public PromoAction(Integer id, double pricePerDay, int durationInDays, boolean isTaken, int capacity) {
        this.id = id;
        this.pricePerDay = pricePerDay;
        this.durationInDays = durationInDays;
        this.isTaken = isTaken;
        this.capacity = capacity;
    }

    public List<AdditionalService> getAdditionalServices() {
        return additionalServices;
    }

    public void setAdditionalServices(List<AdditionalService> additionalServices) {
        this.additionalServices = additionalServices;
    }

    public int getDurationInDays() {
        return durationInDays;
    }

    public void setDurationInDays(int durationInDays) {
        this.durationInDays = durationInDays;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(double pricePerDay) {
        this.pricePerDay = pricePerDay;
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

    public BookingService getBookingService() {
        return bookingService;
    }

    public void setBookingService(BookingService bookingService) {
        this.bookingService = bookingService;
    }


}
