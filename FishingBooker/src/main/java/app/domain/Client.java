package app.domain;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("CLIENT")
public class Client extends User {
    @Column(nullable = true)
    private int numOfPenalties;
    @Column(nullable = true)
    private String verificationCode;


    public Client() {
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
}
