package app.dto;

public class ReportReviewDTO {
    private int id;
    private boolean isSanctioned ;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean getIsSanctioned() {
        return isSanctioned;
    }

    public void setIsSanctioned(boolean sanctioned) {
        isSanctioned = sanctioned;
    }
}
