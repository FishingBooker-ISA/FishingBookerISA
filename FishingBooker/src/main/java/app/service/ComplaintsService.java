package app.service;

import app.domain.BookingService;
import app.domain.Complaint;
import app.domain.User;
import app.dto.ComplaintReviewDTO;
import app.dto.NewComplaintDTO;
import app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class ComplaintsService {
    private ComplaintRepository complaintRepository;
    private EmailService emailService;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    private EstateRepository estateRepository;
    @Autowired
    private AdventureRepository adventureRepository;

    @Autowired
    public ComplaintsService(ComplaintRepository complaintRepository, EmailService emailService){
        this.complaintRepository = complaintRepository;
        this.emailService = emailService;
    }

    @Transactional(readOnly = false)
    public boolean reviewComplaint(ComplaintReviewDTO review) {
        boolean ex = false;
        Complaint foundComplaint = this.complaintRepository.getById(review.getId());
        foundComplaint.setIsReviewed(true);
        foundComplaint.setResponseForClient(review.getResponseForClient());
        foundComplaint.setResponseForOwner(review.getResponseForOwner());
        try{
            this.complaintRepository.save(foundComplaint);
        } catch (Exception exception){
            ex = true;
        }
        if(!ex){
            notifyClient(foundComplaint);
             notifyOwner(foundComplaint);
        }
        return ex;
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

    public void createComplaint(NewComplaintDTO c) {
        Complaint complaint = new Complaint();
        complaint.setReason(c.getReason());
        Date now = new Date();
        complaint.setCreatedDate(now);
        complaint.setIsReviewed(false);
        complaint.setResponseForClient("");
        complaint.setResponseForOwner("");
        complaint.setIsComplaintOnOwner(c.isComplaintOnOwner());
        complaint.setVersion(0);

        BookingService service = null;
        int serviceId = c.getServiceId();
        if(shipRepository.existsById(serviceId)){
            service = shipRepository.getById((serviceId));
        }
        else if (adventureRepository.existsById(serviceId)){
            service = adventureRepository.getById(serviceId);
        }
        else if (estateRepository.existsById(serviceId)){
            service = estateRepository.getById(serviceId);
        }
        if (service != null){
            User owner = service.getOwner();
            complaint.setOwner(owner);
        }
        User client = clientRepository.getById(c.getClientId());
        complaint.setClient(client);
        complaintRepository.save(complaint);
    }
}
