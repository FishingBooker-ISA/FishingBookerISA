package app.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

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

    public Ship(double length, int numOfEngines) {
        this.length = length;
        this.numOfEngines = numOfEngines;
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
