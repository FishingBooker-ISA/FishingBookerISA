package app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.InheritanceType.TABLE_PER_CLASS;

@Entity
@Table(name = "services")
@Inheritance(strategy = TABLE_PER_CLASS)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public abstract class BookingService {
    @Id
    @SequenceGenerator(name = "mySeqGenV1", sequenceName = "mySeqV1", initialValue = 3, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mySeqGenV1")
    private Integer id;
    @Column(nullable = false)
    private ServiceType type;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private double pricePerDay;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String termsOfUse;
    @Column(nullable = false)
    private String additionalEquipment;
    @Column(nullable = true)
    private Date availableFrom;
    @Column(nullable = true)
    private Date availableTo;
    @Column(nullable = false)
    private int capacity;
    @Column(nullable = false)
    private boolean isPercentageTakenFromCanceledReservations;
    @Column(nullable = false)
    private double percentageToTake;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id")
    private User owner;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "address_id")
    private Address address;

    public BookingService() {
    }

    public BookingService(ServiceType type, String name, double pricePerDay, String description,
                          String termsOfUse, String additionalEquipment, Date availableFrom, Date availableTo,
                          int capacity, boolean isPercentageTakenFromCanceledReservations, double percentageToTake,
                          User owner, Address address) {
        this.type = type;
        this.name = name;
        this.pricePerDay = pricePerDay;
        this.description = description;
        this.termsOfUse = termsOfUse;
        this.additionalEquipment = additionalEquipment;
        this.availableFrom = availableFrom;
        this.availableTo = availableTo;
        this.capacity = capacity;
        this.isPercentageTakenFromCanceledReservations = isPercentageTakenFromCanceledReservations;
        this.percentageToTake = percentageToTake;
        this.owner = owner;
        this.address = address;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ServiceType getType() {
        return type;
    }

    public void setType(ServiceType type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTermsOfUse() {
        return termsOfUse;
    }

    public void setTermsOfUse(String termsOfUse) {
        this.termsOfUse = termsOfUse;
    }

    public String getAdditionalEquipment() {
        return additionalEquipment;
    }

    public void setAdditionalEquipment(String additionalEquipment) {
        this.additionalEquipment = additionalEquipment;
    }

    public Date getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(Date availableFrom) {
        this.availableFrom = availableFrom;
    }

    public Date getAvailableTo() {
        return availableTo;
    }

    public void setAvailableTo(Date availableTo) {
        this.availableTo = availableTo;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public boolean isPercentageTakenFromCanceledReservations() {
        return isPercentageTakenFromCanceledReservations;
    }

    public void setPercentageTakenFromCanceledReservations(boolean percentageTakenFromCanceledReservations) {
        isPercentageTakenFromCanceledReservations = percentageTakenFromCanceledReservations;
    }

    public double getPercentageToTake() {
        return percentageToTake;
    }

    public void setPercentageToTake(double percentageToTake) {
        this.percentageToTake = percentageToTake;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }


}
