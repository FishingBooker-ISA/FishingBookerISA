package app.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Ship extends BookingService {
    @Column(nullable = true)
    private double length;
    @Column(nullable = true)
    private int numOfEngines;
    @Column(nullable = true)
    private double powerOfEngines;
    @Column(nullable = true)
    private double maxSpeed;
    @Column(nullable = true)
    private ShipType type;


    public Ship() {
    }

    public Ship (ServiceType type, String name, double pricePerDay, String description, String termsOfUse,
                String additionalEquipment, Date availableFrom, Date availableTo, int capacity,
                boolean isPercentageTakenFromCanceledReservations, double percentageToTake, User owner,
                Address address, double length, int numOfEngines, double powerOfEngines, double maxSpeed, ShipType type1) {
        super(type, name, pricePerDay, description, termsOfUse, additionalEquipment, availableFrom, availableTo,
                capacity, isPercentageTakenFromCanceledReservations, percentageToTake, owner, address);
        this.length = length;
        this.numOfEngines = numOfEngines;
        this.powerOfEngines = powerOfEngines;
        this.maxSpeed = maxSpeed;
        this.type = type1;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }

    public int getNumOfEngines() {
        return numOfEngines;
    }

    public void setNumOfEngines(int numOfEngines) {
        this.numOfEngines = numOfEngines;
    }

    public double getPowerOfEngines() {
        return powerOfEngines;
    }

    public void setPowerOfEngines(double powerOfEngines) {
        this.powerOfEngines = powerOfEngines;
    }

    public double getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(double maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public void setType(ShipType type) {
        this.type = type;
    }
}
