package app.dto;

public class AccountRequestReviewDTO {
    private Integer id;
    private boolean isDenied;
    private String denialReason;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean  getIsDenied() {
        return isDenied;
    }

    public void setIsDenied(boolean denied) {
        isDenied = denied;
    }

    public String getDenialReason() {
        return denialReason;
    }

    public void setDenialReason(String denialReason) {
        this.denialReason = denialReason;
    }
}
