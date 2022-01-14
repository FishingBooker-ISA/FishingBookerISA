package app.dto;

import javax.validation.constraints.NotNull;

public class ImageDTO {
    @NotNull(message = "Image must be assigned to a service!")
    int serviceId;
    @NotNull(message = "Image must have content!")
    String base64;

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

}
