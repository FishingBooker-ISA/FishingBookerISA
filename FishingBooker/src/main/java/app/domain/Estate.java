package app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Estate extends BookingService {
    @Column(nullable = true)
    private int numOfBeds;
    @Column(nullable = true)
    private int numOfRooms;

    public Estate() {
    }

    public Estate (ServiceType type, String name, double pricePerDay, String description, String termsOfUse,
                  String additionalEquipment, int capacity,
                  boolean isPercentageTakenFromCanceledReservations, double percentageToTake, User owner, Address address,
                  int numOfBeds, int numOfRooms) {
        super(type, name, pricePerDay, description, termsOfUse, additionalEquipment,
                capacity, isPercentageTakenFromCanceledReservations, percentageToTake, owner, address);
        this.numOfBeds = numOfBeds;
        this.numOfRooms = numOfRooms;
    }

    public int getNumOfBeds() {
        return numOfBeds;
    }

    public void setNumOfBeds(int numOfBeds) {
        this.numOfBeds = numOfBeds;
    }

    public int getNumOfRooms() {
        return numOfRooms;
    }

    public void setNumOfRooms(int numOfRooms) {
        this.numOfRooms = numOfRooms;
    }
}
