package app.domain;

import javax.persistence.*;


@Entity
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private double givenMark;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private boolean isReviwed;
    @Column(nullable = false)
    private boolean isApproved;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "service_id")
    private BookingService bookingService;

    public Rating() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public double getGivenMark() {
        return givenMark;
    }

    public void setGivenMark(double givenMark) {
        this.givenMark = givenMark;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public boolean getIsReviwed() {
        return isReviwed;
    }

    public void setIsReviwed(boolean reviwed) {
        isReviwed = reviwed;
    }

    public BookingService getBookingService() {
        return bookingService;
    }

    public void setBookingService(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    public boolean getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(boolean approved) {
        isApproved = approved;
    }
}
