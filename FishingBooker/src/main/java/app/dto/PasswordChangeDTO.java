package app.dto;

import javax.validation.constraints.NotNull;

public class PasswordChangeDTO {
    @NotNull(message = "Entering old password is required!")
    private String oldPassword;
    @NotNull(message = "New password must be entered!")
    private String newPassword;

    public PasswordChangeDTO() {}

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
