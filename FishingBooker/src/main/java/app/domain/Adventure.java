package app.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Adventure extends BookingService {
    @Column(nullable = false)
    private String instructorBio;

    public Adventure() {
    }

    public Adventure(ServiceType type, String name, double pricePerDay, String description, String termsOfUse, int capacity,
                     boolean isPercentageTakenFromCanceledReservations, double percentageToTake, User owner,
                     Address address, String instructorBio) {
        super(type, name, pricePerDay, description, termsOfUse, capacity,
                isPercentageTakenFromCanceledReservations, percentageToTake, owner, address);
        this.instructorBio = instructorBio;
    }

    public String getInstructorBio() {
        return instructorBio;
    }

    public void setInstructorBio(String instructorBio) {
        this.instructorBio = instructorBio;
    }
}
