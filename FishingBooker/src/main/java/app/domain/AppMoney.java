package app.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
public class AppMoney {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private Date date;
    @Column(nullable = false)
    private double money;

    public AppMoney(){}

    public AppMoney(Integer id, Date date, double money) {
        this.id = id;
        this.date = date;
        this.money = money;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }
}
