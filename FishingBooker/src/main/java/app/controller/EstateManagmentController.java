package app.controller;

import app.domain.BookingService;
import app.domain.Estate;
import app.domain.Image;
import app.domain.User;
import app.dto.NewEstateDTO;
import app.repository.EstateRepository;
import app.repository.ImageRepository;
import app.repository.ReservationRepository;
import app.repository.ServiceRepository;
import app.service.ManagingEstateService;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.parsing.Problem;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.websocket.server.PathParam;
import java.awt.print.Book;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping(value = "api/estates")
public class EstateManagmentController {
    @Autowired
    private UserService userService;
    @Autowired
    private ManagingEstateService managingEstateService;
    @Autowired
    private EstateRepository estateRepository;
    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping(value = "/getEstatesForOwner", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public List<Estate> getEstatesByOwner(Principal user){
        User currentUser = this.userService.findByEmail(user.getName());

        return estateRepository.findByOwnerId(currentUser.getId());
    }

    @GetMapping(value = "/getEstateById", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public BookingService getEstatesById(Principal user, int id){
        User currentUser = this.userService.findByEmail(user.getName());

        for (Estate estate : estateRepository.findByOwnerId(currentUser.getId())) {
            if(estate.getId() == id)
                return estate;
        }

        return null;
    }

    @PostMapping(value = "/createEstate")
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public ResponseEntity<String> createEstate(@RequestBody NewEstateDTO newEstateDTO, Principal user) {
        Estate existingEstate = estateRepository.findEstateByName(newEstateDTO.getName());

        if (existingEstate != null) {
            return new ResponseEntity<>("Owner already has an estate with this name!", HttpStatus.BAD_REQUEST);
        }

        try {
            User currentUser = userService.findByEmail(user.getName());
            managingEstateService.createNewEstate(newEstateDTO, currentUser);
            return new ResponseEntity<>("Estate created!", HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/updateEstate")
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public ResponseEntity<String> updateEstate(@RequestBody NewEstateDTO estateDTO, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        Estate existingEstate = estateRepository.getById(estateDTO.getId());

        if (existingEstate == null) {
            return new ResponseEntity<>("Entity doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        if (existingEstate.getOwner().getId() != currentUser.getId()){
            return new ResponseEntity<>("Unauthorized operation!", HttpStatus.UNAUTHORIZED);
        }

        if(managingEstateService.hasAnyReservations(existingEstate)) {
            return new ResponseEntity<>("Estate has reservations and can't be edited!", HttpStatus.BAD_REQUEST);
        }

        try {
            managingEstateService.updateExistingEstate(estateDTO, existingEstate);
            return new ResponseEntity<>("Estate updated!", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/deleteEstate/{id}")
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public ResponseEntity<String> deleteEstate(@PathVariable int id, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        Estate existingEstate = estateRepository.getById(id);

        if (existingEstate == null) {
            return new ResponseEntity<>("Entity doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        if (existingEstate.getOwner().getId() != currentUser.getId()){
            return new ResponseEntity<>("Unauthorized operation!", HttpStatus.UNAUTHORIZED);
        }

        if(managingEstateService.hasAnyReservations(existingEstate)) {
            return new ResponseEntity<>("Estate has reservations and can't be deleted!", HttpStatus.BAD_REQUEST);
        }

        try {
            managingEstateService.deleteEstate(existingEstate);
            return new ResponseEntity<>("Estate updated!", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/findEstateByName", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public List<Estate> findEstatesByName(Principal user, String name) {
        User currentUser = this.userService.findByEmail(user.getName());
        List<Estate> foundEstates = new ArrayList<>();

        for (Estate estate : estateRepository.findByOwnerId(currentUser.getId())) {
            if(estate.getName().toLowerCase().contains(name.toLowerCase()))
                foundEstates.add(estate);
        }

        return foundEstates;
    }
}

















