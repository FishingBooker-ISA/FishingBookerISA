package app.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String reason;
    @Column(nullable = true)
    private Date createdDate;
    @Column(nullable = true)
    private boolean isReviewed;
    @Column(nullable = true)
    private String responseForClient;
    @Column(nullable = true)
    private String responseForOwner;
    @Column(nullable = true)
    private boolean isComplaintOnOwner;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private User client;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id")
    private User owner;

    @Version
    //@Column(nullable = false)
    private Integer version;

    public Complaint() {
    }

    public Complaint(int id, String reason, Date createdDate, boolean isReviewed, String responseForClient) {
        this.id = id;
        this.reason = reason;
        this.createdDate = createdDate;
        this.isReviewed = isReviewed;
        this.responseForClient = responseForClient;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public boolean getIsReviewed() {
        return isReviewed;
    }

    public void setIsReviewed(boolean reviewed) {
        isReviewed = reviewed;
    }

    public String getResponseForClient() {
        return responseForClient;
    }

    public void setResponseForClient(String responseForClient) {
        this.responseForClient = responseForClient;
    }

    public String getResponseForOwner() {
        return responseForOwner;
    }

    public void setResponseForOwner(String responseForOwner) {
        this.responseForOwner = responseForOwner;
    }

    public boolean getIsComplaintOnOwner() {
        return isComplaintOnOwner;
    }

    public void setIsComplaintOnOwner(boolean complaintOnOwner) {
        isComplaintOnOwner = complaintOnOwner;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}
