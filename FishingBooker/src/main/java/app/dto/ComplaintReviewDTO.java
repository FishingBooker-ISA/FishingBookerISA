package app.dto;

public class ComplaintReviewDTO {
    private int id;
    private String responseForClient;
    private String responseForOwner;

    public ComplaintReviewDTO() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getResponseForClient() {
        return responseForClient;
    }

    public void setResponseForClient(String responseForClient) {
        this.responseForClient = responseForClient;
    }

    public String getResponseForOwner() {
        return responseForOwner;
    }

    public void setResponseForOwner(String responseForOwner) {
        this.responseForOwner = responseForOwner;
    }
}
