package app.dto;

public class AdditionalEquipmentDTO {
    private int id;
    private String name;
    private double price;
    private int bookingServiceId;

    public int getBookingServiceId() {
        return bookingServiceId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setBookingServiceId(int bookingServiceId) {
        this.bookingServiceId = bookingServiceId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
