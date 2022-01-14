package app.dto;

import javax.persistence.Column;

public class LoyaltyProgramDTO {
    private int id;
    private double pointsForBronze;
    private double percentForBronze;
    private double pointsForSilver;
    private double percentForSilver;
    private double pointsForGold;
    private double percentForGold;

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
