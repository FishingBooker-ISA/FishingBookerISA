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
    @Column(nullable = false)
    private double pointsForSilver;
    @Column(nullable = false)
    private double percentForSilver;
    @Column(nullable = false)
    private double pointsForGold;
    @Column(nullable = false)
    private double percentForGold;
    @Column(nullable = false)
    private double pointsForUser;
    @Column(nullable = false)
    private double pointsForOwner;
    @Column(nullable = false)
    private double percentageForApp;

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

    public double getPointsForUser() {
        return pointsForUser;
    }

    public void setPointsForUser(double pointsForUser) {
        this.pointsForUser = pointsForUser;
    }

    public double getPointsForOwner() {
        return pointsForOwner;
    }

    public void setPointsForOwner(double pointsForOwner) {
        this.pointsForOwner = pointsForOwner;
    }

    public double getPercentageForApp() {
        return percentageForApp;
    }

    public void setPercentageForApp(double percentageForApp) {
        this.percentageForApp = percentageForApp;
    }
}
