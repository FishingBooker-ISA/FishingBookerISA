package app.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
public class UnavailablePeriod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column
    private Date startDate;
    @Column
    private Date endDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "service_id")
    private BookingService service;

    public UnavailablePeriod() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public BookingService getService() {
        return service;
    }

    public void setService(BookingService service) {
        this.service = service;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
