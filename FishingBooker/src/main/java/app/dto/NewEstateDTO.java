package app.dto;

import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

public class NewEstateDTO {
    private int id;
    @NotNull(message = "Estate must have a name!")
    private String name;
    @NotNull(message = "Estate must have a defined price!")
    @Min(value = 1, message = "Price must be larger than 0!")
    private double pricePerDay;
    @NotNull(message = "Description is required!")
    private String description;
    private String termsOfUse;
    @NotNull(message = "Estate must have a defined capacity!")
    @Min(value = 1, message = "Price must be larger than 0!")
    private int capacity;
    @NotNull(message = "Estate must have a defined street!")
    private String street;
    @NotNull(message = "Estate must have a defined street number!")
    private int number;
    @NotNull(message = "Estate must have a defined city!")
    private String city;
    @NotNull(message = "Estate must have a defined country!")
    private String country;
    @NotNull(message = "Estate must have a defined postcode!")
    private int postcode;
    private double longitude;
    private double latitude;
    @NotNull(message = "Estate must have a defined number of rooms!")
    @Min(value = 1, message = "Number of rooms must be larger than 0!")
    private int numOfRooms;
    @NotNull(message = "Estate must have a defined number of beds!")
    @Min(value = 1, message = "Number of beds must be larger than 0!")
    private int numOfBeds;
    private boolean isPercentageTakenFromCanceledReservations;
    @Range(min = 0, max = 100, message = "Percentage must range from 0 to 100!")
    private double percentageToTake;
    private List<AdditionalEquipmentDTO> additionalServiceList;

    public List<AdditionalEquipmentDTO> getAdditionalServiceList() {
        return additionalServiceList;
    }

    public void setAdditionalServiceList(List<AdditionalEquipmentDTO> additionalServiceList) {
        this.additionalServiceList = additionalServiceList;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public int getId() {
        return id;
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

    public int getNumOfRooms() {
        return numOfRooms;
    }

    public void setNumOfRooms(int numOfRooms) {
        this.numOfRooms = numOfRooms;
    }

    public int getNumOfBeds() {
        return numOfBeds;
    }

    public void setNumOfBeds(int numOfBeds) {
        this.numOfBeds = numOfBeds;
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

}
