package app.domain;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.util.Date;

@Entity
@DiscriminatorValue("CLIENT")
public class Client extends User {
    @Column(nullable = true)
    private int numOfPenalties;

    @Column(nullable = true)
    private Date lastPenaltyDate;

    @Column(nullable = true)
    private String verificationCode;


    public Client() {
    }

    public Client(int numOfPenalties, String verificationCode) {
        this.numOfPenalties = numOfPenalties;
        this.verificationCode = verificationCode;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public int getNumOfPenalties() {
        return numOfPenalties;
    }

    public void setNumOfPenalties(int numOfPenalties) {
        this.numOfPenalties = numOfPenalties;
    }

    public Date getLastPenaltyDate() {
        return lastPenaltyDate;
    }

    public void setLastPenaltyDate(Date lastPenaltyDate) {
        this.lastPenaltyDate = lastPenaltyDate;
    }
}
