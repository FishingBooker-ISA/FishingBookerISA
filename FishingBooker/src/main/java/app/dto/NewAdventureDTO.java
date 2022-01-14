package app.dto;

public class NewAdventureDTO {
    private int id;
    private String name;
    private double pricePerDay;
    private String description;
    private String termsOfUse;
    private String additionalEquipment;
    private int capacity;
    private String street;
    private int number;
    private String city;
    private String country;
    private int postcode;
    private boolean isPercentageTakenFromCanceledReservations;
    private double percentageToTake;
    private String instructorBio;

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

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getPostcode() {
        return postcode;
    }

    public void setPostcode(int postcode) {
        this.postcode = postcode;
    }

    public boolean getIsPercentageTakenFromCanceledReservations() {
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

    public String getInstructorBio() {
        return instructorBio;
    }

    public void setInstructorBio(String instructorBio) {
        this.instructorBio = instructorBio;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
