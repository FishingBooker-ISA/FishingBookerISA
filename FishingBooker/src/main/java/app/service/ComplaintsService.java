package app.service;

import app.domain.BookingService;
import app.domain.Complaint;
import app.domain.User;
import app.dto.ComplaintReviewDTO;
import app.dto.NewComplaintDTO;
import app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ComplaintsService {
    private ComplaintRepository complaintRepository;
    private ClientRepository clientRepository;
    private EmailService emailService;
    private ShipRepository shipRepository;
    private EstateRepository estateRepository;
    private AdventureRepository adventureRepository;

    @Autowired
    public ComplaintsService(ComplaintRepository complaintRepository, ClientRepository clientRepository, ShipRepository shipRepository, EstateRepository estateRepository, AdventureRepository adventureRepository, EmailService emailService){
        this.complaintRepository = complaintRepository;
        this.emailService = emailService;
        this.clientRepository = clientRepository;
        this.shipRepository = shipRepository;
        this.estateRepository = estateRepository;
        this.adventureRepository = adventureRepository;
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

    public void createComplaint(NewComplaintDTO c) {
        Complaint complaint = new Complaint();
        complaint.setReason(c.getReason());
        Date now = new Date();
        complaint.setCreatedDate(now);
        complaint.setIsReviewed(false);
        complaint.setResponseForClient("");
        complaint.setResponseForOwner("");
        complaint.setIsComplaintOnOwner(c.isComplaintOnOwner());

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
        User owner = service.getOwner();
        User client = clientRepository.getById(c.getClientId());
        complaint.setOwner(owner);
        complaint.setClient(client);
        complaintRepository.save(complaint);
    }
}
