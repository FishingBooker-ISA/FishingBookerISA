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
    private boolean isVerified;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    public Report() {
    }

    public boolean getVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
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
}
