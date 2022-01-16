package app.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String text;
    @Column(nullable = false)
    private Date createdOn;
    @Column(nullable = false)
    private boolean clientDidntShowUp;
    @Column(nullable = false)
    private boolean sanctionClient;
    @Column(nullable = true)
    private boolean isReviewed;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    public Report() {
    }

    public Report(Integer id, String text, Date createdOn) {
        this.id = id;
        this.text = text;
        this.createdOn = createdOn;
    }

    public boolean getSanctionClient() {
        return sanctionClient;
    }

    public void setSanctionClient(boolean sanctionClient) {
        this.sanctionClient = sanctionClient;
    }

    public boolean getClientDidntShowUp() {
        return clientDidntShowUp;
    }

    public void setClientDidntShowUp(boolean clientDidntShowUp) {
        this.clientDidntShowUp = clientDidntShowUp;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }


    public boolean getIsReviewed() {
        return isReviewed;
    }

    public void setIsReviewed(boolean reviewed) {
        isReviewed = reviewed;
    }
}
