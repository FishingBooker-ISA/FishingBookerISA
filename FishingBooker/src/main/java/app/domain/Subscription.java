package app.domain;

import javax.persistence.*;

@Entity
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private User client;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "service_id")
    private BookingService bookingService;

    public Subscription() {
    }

    public Subscription(Integer id, User client, BookingService bookingService) {
        this.id = id;
        this.client = client;
        this.bookingService = bookingService;
    }

    public Subscription(User client, BookingService bookingService) {
        this.client = client;
        this.bookingService = bookingService;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public BookingService getService() {
        return bookingService;
    }

    public void setService(BookingService bookingService) {
        this.bookingService = bookingService;
    }
}
