package app.controller;

import app.domain.AdditionalService;
import app.domain.BookingService;
import app.domain.User;
import app.dto.AdditionalEquipmentDTO;
import app.repository.AdditionalServiceRepository;
import app.repository.ServiceRepository;
import app.service.AdditionalEquipmentService;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "api/additional")
public class AdditionalEquipmentController {
    @Autowired
    AdditionalServiceRepository additionalServiceRepository;
    @Autowired
    AdditionalEquipmentService additionalService;
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    UserService userService;

    private static final String UNAUTHORIZED = "Unauthorized access!";

    @GetMapping(value = "/getAdditionalForService", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<AdditionalService>> getAllByService(int id, Principal user) {
        return new ResponseEntity<>(additionalServiceRepository.getAllByBookingServiceId(id), HttpStatus.OK);
    }

    @GetMapping(value = "/additional/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize( "hasAuthority('ROLE_CLIENT')")
    public ResponseEntity<List<AdditionalService>> get(@PathVariable int id) {
        return new ResponseEntity<>(additionalServiceRepository.getAllByBookingServiceId(id), HttpStatus.OK);
    }

    @PutMapping(value = "/updateAdditionalEquipment", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + " || hasAuthority('ROLE_SHIP_OWNER')" + " || hasAuthority('ROLE_INSTRUCTOR')")
    public ResponseEntity<String> update(@RequestBody AdditionalEquipmentDTO dto, Principal user) {
        BookingService existing = serviceRepository.getById(dto.getBookingServiceId());
        User currentUser = userService.findByEmail(user.getName());

        if (!existing.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        additionalService.updateAddedServices(dto, existing);
        return new ResponseEntity<>("Updated additional services!", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping(value = "/deleteAdditionalEquipment", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + " || hasAuthority('ROLE_INSTRUCTOR')" + " || hasAuthority('ROLE_SHIP_OWNER')")
    public ResponseEntity<String> delete(@RequestBody AdditionalEquipmentDTO dto, Principal user) {
        BookingService existing = serviceRepository.getById(dto.getBookingServiceId());
        User currentUser = userService.findByEmail(user.getName());

        if (!existing.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        additionalService.deleteAddedServices(dto, existing);
        return new ResponseEntity<>("Updated additional services!", HttpStatus.OK);
    }

    @PostMapping(value = "/addAdditionalEquipment", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + " || hasAuthority('ROLE_SHIP_OWNER')" + " || hasAuthority('ROLE_INSTRUCTOR')")
    public ResponseEntity<String> add(@RequestBody AdditionalEquipmentDTO dto, Principal user) {
        BookingService existing = serviceRepository.getById(dto.getBookingServiceId());
        User currentUser = userService.findByEmail(user.getName());

        if (!existing.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        additionalService.addAdditionalServices(dto, existing);
        return new ResponseEntity<>("Added new additional services!", HttpStatus.OK);
    }
}
