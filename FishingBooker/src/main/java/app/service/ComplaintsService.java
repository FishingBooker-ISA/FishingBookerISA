package app.service;

import app.domain.Complaint;
import app.dto.ComplaintReviewDTO;
import app.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComplaintsService {
    private ComplaintRepository complaintRepository;
    private EmailService emailService;

    @Autowired
    public ComplaintsService(ComplaintRepository complaintRepository, EmailService emailService){
        this.complaintRepository = complaintRepository;
        this.emailService = emailService;
    }

    public void reviewComplaint(ComplaintReviewDTO review) {
        Complaint foundComplaint = this.complaintRepository.getById(review.getId());
        foundComplaint.setIsReviewed(true);
        foundComplaint.setResponseForClient(review.getResponseForClient());
        foundComplaint.setResponseForOwner(review.getResponseForOwner());
        this.complaintRepository.save(foundComplaint);
        notifyClient(foundComplaint);
        notifyOwner(foundComplaint);
    }

    private void notifyOwner(Complaint complaint) {
        String mailSubject = "New Complaint";
        String mailContent = "Hello,\nComplaint from " +
                complaint.getClient().getFirstName() + " " +  complaint.getClient().getLastName() +
                " has been reviewed.\n Response: " + complaint.getResponseForOwner() +
                "\nFishing Booker";
        this.emailService.sendMail(complaint.getOwner(), mailSubject, mailContent);
    }

    private void notifyClient(Complaint complaint) {
        String mailSubject = "Response On Your Complaint";
        String mailContent = "Hello,\nYour complaint on " +
                complaint.getOwner().getFirstName() + " " +  complaint.getOwner().getLastName() +
                " has been reviewed. \nResponse: " + complaint.getResponseForClient() +
        "\nFishing Booker";
        this.emailService.sendMail(complaint.getClient(), mailSubject, mailContent);
    }
}
