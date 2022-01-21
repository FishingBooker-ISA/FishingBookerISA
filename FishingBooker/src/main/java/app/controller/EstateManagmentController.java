package app.controller;

import app.domain.BookingService;
import app.domain.Estate;
import app.domain.User;
import app.dto.NewEstateDTO;
import app.dto.ServiceAvailabilitySearchParametersDTO;
import app.dto.ServiceWithRatingDTO;
import app.repository.EstateRepository;
import app.repository.ServiceRepository;
import app.repository.UnavailablePeriodRepository;
import app.service.ManagingEstateService;
import app.service.ManagingReservationsService;
import app.service.RatingsService;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

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
    @Autowired
    private UnavailablePeriodRepository unavailablePeriodRepository;
    @Autowired
    private ManagingReservationsService reservationsService;
    @Autowired
    private RatingsService ratingService;

    private static final String UNAUTHORIZED = "Unauthorized access!";

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
    public ResponseEntity<String> createEstate(@Valid @RequestBody NewEstateDTO newEstateDTO, Principal user) {
        Estate existingEstate = estateRepository.findEstateByName(newEstateDTO.getName());

        if (existingEstate != null) {
            return new ResponseEntity<>("Owner already has an estate with this name!", HttpStatus.BAD_REQUEST);
        }

        try {
            User currentUser = userService.findByEmail(user.getName());
            if (managingEstateService.createNewEstate(newEstateDTO, currentUser) == null)
                return new ResponseEntity<>("You can't add multiple additional services with the same name!!",
                        HttpStatus.CREATED);
            else
                return new ResponseEntity<>("Estate created!", HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/updateEstate")
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public ResponseEntity<String> updateEstate(@Valid @RequestBody NewEstateDTO estateDTO, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        Estate existingEstate = estateRepository.getById(estateDTO.getId());

        if (!existingEstate.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        if(!managingEstateService.hasAnyReservations(existingEstate)) {
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

        if (!existingEstate.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        if(!managingEstateService.hasAnyReservations(existingEstate)) {
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

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ServiceWithRatingDTO> getAll(){
        List<Estate> allEstates = managingEstateService.getAll();
        List<ServiceWithRatingDTO> result = new ArrayList<>();
        for (Estate estate : allEstates) {
            ServiceWithRatingDTO service = new ServiceWithRatingDTO(estate, ratingService.getAvgRatingForBookingService(estate.getId()), ratingService.getNumberOfRatingsForBookingService(estate.getId()));
            result.add(service);
        }
        return result;
    }

    @GetMapping(value = "/search/name/{input}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ServiceWithRatingDTO> searchEstatesByName(@PathVariable String input) {
        List<Estate> foundEstates = this.managingEstateService.searchByName(input);
        List<ServiceWithRatingDTO> result = new ArrayList<>();
        for (Estate estate : foundEstates) {
            ServiceWithRatingDTO service = new ServiceWithRatingDTO(estate, ratingService.getAvgRatingForBookingService(estate.getId()), ratingService.getNumberOfRatingsForBookingService(estate.getId()));
            result.add(service);
        }
        return result;
    }

    @GetMapping(value = "/search/city/{input}", produces = MediaType.APPLICATION_JSON_VALUE)
    //@PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public List<ServiceWithRatingDTO> searchEstatesByCity(@PathVariable String input) {
        List<Estate> foundEstates = this.managingEstateService.searchByCity(input);
        List<ServiceWithRatingDTO> result = new ArrayList<>();
        for (Estate estate : foundEstates) {
            ServiceWithRatingDTO service = new ServiceWithRatingDTO(estate, ratingService.getAvgRatingForBookingService(estate.getId()), ratingService.getNumberOfRatingsForBookingService(estate.getId()));
            result.add(service);
        }
        return result;
    }

    @PostMapping(value = "/available", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public List<ServiceWithRatingDTO> findAvailableEstates(@RequestBody ServiceAvailabilitySearchParametersDTO parameters) throws ParseException {
        List<Estate> foundEstates = this.managingEstateService.findAvailable(parameters);
        List<ServiceWithRatingDTO> result = new ArrayList<>();
        for (Estate estate : foundEstates) {
            ServiceWithRatingDTO service = new ServiceWithRatingDTO(estate, ratingService.getAvgRatingForBookingService(estate.getId()), ratingService.getNumberOfRatingsForBookingService(estate.getId()));
            result.add(service);
        }
        System.out.println(parameters.getCapacity());
        System.out.println(parameters.getStartDate());
        return result;
    }

}
