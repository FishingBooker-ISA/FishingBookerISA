package app.domain;

import javax.persistence.*;

@Entity
public class LoyaltyProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private double pointsForBronze;
    @Column(nullable = false)
    private double percentForBronze;
    @Column(nullable = true)
    private double pointsForSilver;
    @Column(nullable = true)
    private double percentForSilver;
    @Column(nullable = true)
    private double pointsForGold;
    @Column(nullable = true)
    private double percentForGold;

    public LoyaltyProgram(){}

    public LoyaltyProgram(double pointsForBronze, double percentForBronze, double pointsForSilver, double percentForSilver, double pointsForGold, double percentForGold) {
        this.pointsForBronze = pointsForBronze;
        this.percentForBronze = percentForBronze;
        this.pointsForSilver = pointsForSilver;
        this.percentForSilver = percentForSilver;
        this.pointsForGold = pointsForGold;
        this.percentForGold = percentForGold;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getPointsForBronze() {
        return pointsForBronze;
    }

    public void setPointsForBronze(double pointsForBronze) {
        this.pointsForBronze = pointsForBronze;
    }

    public double getPercentForBronze() {
        return percentForBronze;
    }

    public void setPercentForBronze(double percentForBronze) {
        this.percentForBronze = percentForBronze;
    }

    public double getPointsForSilver() {
        return pointsForSilver;
    }

    public void setPointsForSilver(double pointsForSilver) {
        this.pointsForSilver = pointsForSilver;
    }

    public double getPercentForSilver() {
        return percentForSilver;
    }

    public void setPercentForSilver(double percentForSilver) {
        this.percentForSilver = percentForSilver;
    }

    public double getPointsForGold() {
        return pointsForGold;
    }

    public void setPointsForGold(double pointsForGold) {
        this.pointsForGold = pointsForGold;
    }

    public double getPercentForGold() {
        return percentForGold;
    }

    public void setPercentForGold(double percentForGold) {
        this.percentForGold = percentForGold;
    }
}
