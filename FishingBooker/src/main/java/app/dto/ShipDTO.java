package app.dto;

import app.domain.ShipType;

import java.util.List;

public class ShipDTO {
    private int id;
    private String name;
    private double pricePerDay;
    private String description;
    private String termsOfUse;
    private int capacity;
    private String street;
    private int number;
    private String city;
    private String country;
    private int postcode;
    private int numOfEngines;
    private double powerOfEngines;
    private double length;
    private double maxSpeed;
    private boolean isPercentageTakenFromCanceledReservations;
    private double percentageToTake;
    private ShipType shipType;
    private List<NavigationToolDTO> navigationTools;
    private List<AdditionalEquipmentDTO> additionalEquipmentList;

    public List<AdditionalEquipmentDTO> getAdditionalEquipmentList() {
        return additionalEquipmentList;
    }

    public void setAdditionalEquipmentList(List<AdditionalEquipmentDTO> additionalEquipmentList) {
        this.additionalEquipmentList = additionalEquipmentList;
    }

    public List<NavigationToolDTO> getNavigationTools() {
        return navigationTools;
    }

    public void setNavigationTools(List<NavigationToolDTO> navigationTools) {
        this.navigationTools = navigationTools;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }

    public double getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(double maxSpeed) {
        this.maxSpeed = maxSpeed;
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

    public ShipType getShipType() {
        return shipType;
    }

    public void setShipType(ShipType shipType) {
        this.shipType = shipType;
    }
}
