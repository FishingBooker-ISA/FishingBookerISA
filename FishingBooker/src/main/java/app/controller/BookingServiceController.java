package app.controller;

import app.domain.BookingService;
import app.repository.ServiceRepository;
import app.service.ManagingReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/services")
public class BookingServiceController {
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private ManagingReservationsService managingReservationsService;

    @GetMapping(value = "/getAllServices", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<BookingService> getAllServices(){
        return this.serviceRepository.findAll();
    }

    @PostMapping(value = "/deleteService")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> deleteService(@RequestBody int serviceId){

        if(managingReservationsService.hasAnyReservations(serviceId)) {
            return new ResponseEntity<>("Service has reservations and can't be deleted!", HttpStatus.BAD_REQUEST);
        }

        try {
            this.serviceRepository.deleteById(serviceId);
            return new ResponseEntity<>("Services updated!", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
