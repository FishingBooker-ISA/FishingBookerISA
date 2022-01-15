package app.dto;

import app.domain.*;

public class ServiceWithRatingDTO {
    private Integer id;
    private ServiceType type;
    private String name;
    private double pricePerDay;
    private String description;
    private int capacity;
    private Address address;
    private double rating;
    private int reviewsNumber;

    public ServiceWithRatingDTO(Estate service, double rating, int reviewsNumber) {
        this.id = service.getId();
        this.type = service.getType();
        this.name = service.getName();
        this.pricePerDay = service.getPricePerDay();
        this.description = service.getDescription();
        this.capacity = service.getCapacity();
        this.address = service.getAddress();
        this.rating = rating;
        this.reviewsNumber = reviewsNumber;
    }

    public ServiceWithRatingDTO(Adventure service, double rating, int reviewsNumber) {
        this.id = service.getId();
        this.type = service.getType();
        this.name = service.getName();
        this.pricePerDay = service.getPricePerDay();
        this.description = service.getDescription();
        this.capacity = service.getCapacity();
        this.address = service.getAddress();
        this.rating = rating;
        this.reviewsNumber = reviewsNumber;
    }

    public ServiceWithRatingDTO(Ship service, double rating, int reviewsNumber) {
        this.id = service.getId();
        this.type = service.getType();
        this.name = service.getName();
        this.pricePerDay = service.getPricePerDay();
        this.description = service.getDescription();
        this.capacity = service.getCapacity();
        this.address = service.getAddress();
        this.rating = rating;
        this.reviewsNumber = reviewsNumber;
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

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public ServiceWithRatingDTO(ServiceType type) {
        this.type = type;
    }

    public int getReviewsNumber() {
        return reviewsNumber;
    }

    public void setReviewsNumber(int reviewsNumber) {
        this.reviewsNumber = reviewsNumber;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

}
