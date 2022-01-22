package app.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
public class AccountDeletionRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = true)
    private Date requestedDate;
    @Column(nullable = true)
    private String reason;
    @Column(nullable = true)
    private boolean isReviewed;
    @Column(nullable = true)
    private boolean isDenied;
    @Column(nullable = true)
    private String denialReason;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
    @Version
   // @Column(nullable = false)
    private Integer version;

    public AccountDeletionRequest() {}

    public AccountDeletionRequest(Integer id, Date requestedDate, String reason, boolean isReviewed, boolean isDenied, String denialReason, User user) {
        this.id = id;
        this.requestedDate = requestedDate;
        this.reason = reason;
        this.isReviewed = isReviewed;
        this.isDenied = isDenied;
        this.denialReason = denialReason;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getRequestedDate() {
        return requestedDate;
    }

    public void setRequestedDate(Date requestedDate) {
        this.requestedDate = requestedDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public boolean isReviewed() {
        return isReviewed;
    }

    public void setReviewed(boolean reviewed) {
        isReviewed = reviewed;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isDenied() {
        return isDenied;
    }

    public void setDenied(boolean denied) {
        isDenied = denied;
    }

    public String getDenialReason() {
        return denialReason;
    }

    public void setDenialReason(String denialReason) {
        this.denialReason = denialReason;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}
