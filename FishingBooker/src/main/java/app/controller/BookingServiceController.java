package app.controller;

import app.domain.BookingService;
import app.repository.ServiceRepository;
import app.service.ManagingReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
    public void deleteService(@RequestBody int serviceId){
        this.serviceRepository.deleteById(serviceId);
    }
}
