package app.domain;
import javax.persistence.*;

@Entity
public class AccountRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String reason;
    @Column(nullable = true)
    private boolean isDenied;
    @Column(nullable = true)
    private String denialReason;
    @Column(nullable = false)
    private boolean isReviewed;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
    @Version
   // @Column(nullable = false)
    private Integer version;

    public AccountRequest() {
    }

    public AccountRequest(Integer id, String reason, boolean isDenied, String denialReason, boolean isReviewed, User user) {
        this.id = id;
        this.reason = reason;
        this.isDenied = isDenied;
        this.denialReason = denialReason;
        this.isReviewed = isReviewed;
        this.user = user;
    }

    public boolean isDenied() {
        return isDenied;
    }

    public void setDenied(boolean denied) {
        isDenied = denied;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getDenialReason() {
        return denialReason;
    }

    public void setDenialReason(String denialReason) {
        this.denialReason = denialReason;
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

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}
