package app.controller;

import app.domain.Complaint;
import app.dto.ComplaintReviewDTO;
import app.dto.NewComplaintDTO;
import app.repository.ComplaintRepository;
import app.service.ComplaintsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/complaints")
public class ComplaintsController {
    @Autowired
    private ComplaintRepository complaintRepository;
    @Autowired
    private ComplaintsService complaintsService;

    @GetMapping(value = "/getComplaints", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Complaint> getAllComplaints(){
        return this.complaintRepository.findAll();
    }

    @PostMapping(value = "/reviewComplaint", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> reviewComplaint(@RequestBody ComplaintReviewDTO review) {
        if(!this.complaintsService.reviewComplaint(review))
            return new ResponseEntity<>("Review submitted", HttpStatus.OK);
        else
            return new ResponseEntity<>("This complaint has already been reviewed.",HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/new")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public void createComplaint(@RequestBody NewComplaintDTO complaintDTO){
        this.complaintsService.createComplaint(complaintDTO);
    }
}
