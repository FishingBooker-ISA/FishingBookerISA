package app.controller;

import app.domain.Ship;
import app.domain.ShipNavigationTool;
import app.domain.User;
import app.dto.NavigationToolDTO;
import app.dto.ServiceAvailabilitySearchParametersDTO;
import app.dto.ServiceWithRatingDTO;
import app.dto.ShipDTO;
import app.repository.ShipNavigationToolRepository;
import app.repository.ShipRepository;
import app.service.ManagingShipsService;
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
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/ships")
public class ShipsController {
    @Autowired
    private UserService userService;
    @Autowired
    private ManagingShipsService shipsService;
    @Autowired
    private RatingsService ratingService;
    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    private ShipNavigationToolRepository toolRepository;

    private static final String UNAUTHORIZED = "Unauthorized access!";

    @GetMapping(value = "/getShipsForOwner", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_SHIP_OWNER')")
    public List<Ship> getShipsByOwner(Principal user){
        User currentUser = this.userService.findByEmail(user.getName());
        return shipRepository.findByOwnerId(currentUser.getId());
    }

    @GetMapping(value = "/getShipById", produces = MediaType.APPLICATION_JSON_VALUE)
    public Ship getShipById(Principal user, int id){
        for (Ship ship : shipRepository.findAll()) {
            if(ship.getId() == id)
                return ship;
        }

        return null;
    }

    @PostMapping(value = "/createShip")
    @PreAuthorize("hasAuthority('ROLE_SHIP_OWNER')")
    public ResponseEntity<String> createShip(@Valid @RequestBody ShipDTO dto, Principal user) {
        try {
            User currentUser = userService.findByEmail(user.getName());
            if (shipsService.createNewShip(dto, currentUser) == null)
                return new ResponseEntity<>("You can't add multiple additional services with the same name!!",
                        HttpStatus.CREATED);
            else
                return new ResponseEntity<>("Estate created!", HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/updateShip")
    @PreAuthorize("hasAuthority('ROLE_SHIP_OWNER')")
    public ResponseEntity<String> updateEstate(@Valid @RequestBody ShipDTO dto, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        Ship existingShip = shipRepository.getById(dto.getId());

        if (!existingShip.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        if(!shipsService.hasAnyReservations(existingShip)) {
            return new ResponseEntity<>("Ship has reservations and can't be edited!", HttpStatus.BAD_REQUEST);
        }

        try {
            shipsService.updateExistingEstate(dto, existingShip);
            return new ResponseEntity<>("Ship updated!", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/deleteShip/{id}")
    @PreAuthorize("hasAuthority('ROLE_SHIP_OWNER')")
    public ResponseEntity<String> deleteEstate(@PathVariable int id, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        Ship existingShip = shipRepository.getById(id);

        if (!existingShip.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        if(!shipsService.hasAnyReservations(existingShip)) {
            return new ResponseEntity<>("Ship has reservations and can't be deleted!", HttpStatus.BAD_REQUEST);
        }

        try {
            shipsService.deleteEstate(existingShip);
            return new ResponseEntity<>("Ship deleted!", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/findShipByName", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_SHIP_OWNER')")
    public List<Ship> findShipsByName(Principal user, String name) {
        User currentUser = this.userService.findByEmail(user.getName());
        List<Ship> foundShips = new ArrayList<>();

        for (Ship ship : shipRepository.findByOwnerId(currentUser.getId())) {
            if(ship.getName().toLowerCase().contains(name.toLowerCase()))
                foundShips.add(ship);
        }

        return foundShips;
    }

    @GetMapping(value = "/getNavigationTools", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ShipNavigationTool>> getAllByService(int id, Principal user) {
        return new ResponseEntity<>(toolRepository.getAllByShipId(id), HttpStatus.OK);
    }

    @PutMapping(value = "/updateNavigationTools", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_SHIP_OWNER')")
    public ResponseEntity<String> update(@RequestBody NavigationToolDTO dto, Principal user) {
        Ship existing = shipRepository.getById(dto.getShipId());
        User currentUser = userService.findByEmail(user.getName());

        if (!existing.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        shipsService.updateTools(dto, existing);
        return new ResponseEntity<>("Updated additional services!", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping(value = "/deleteTools", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_SHIP_OWNER')")
    public ResponseEntity<String> delete(@RequestBody NavigationToolDTO dto, Principal user) {
        Ship existing = shipRepository.getById(dto.getShipId());
        User currentUser = userService.findByEmail(user.getName());

        if (!existing.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        shipsService.deleteTools(dto, existing);
        return new ResponseEntity<>("Updated navigation tool!", HttpStatus.OK);
    }

    @PostMapping(value = "/addTools", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_SHIP_OWNER')")
    public ResponseEntity<String> add(@RequestBody NavigationToolDTO dto, Principal user) {
        Ship existing = shipRepository.getById(dto.getShipId());
        User currentUser = userService.findByEmail(user.getName());

        if (!existing.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
        }

        shipsService.addNavigationTools(dto, existing);
        return new ResponseEntity<>("Added new navigation tool!", HttpStatus.OK);
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ServiceWithRatingDTO> getAll(){
        List<Ship> allShips = shipsService.getAll();
        List<ServiceWithRatingDTO> result = new ArrayList<>();
        for (Ship ship : allShips) {
            ServiceWithRatingDTO service = new ServiceWithRatingDTO(ship, ratingService.getAvgRatingForBookingService(ship.getId()), ratingService.getNumberOfRatingsForBookingService(ship.getId()));
            result.add(service);
        }
        return result;
    }

    @GetMapping(value = "/search/name/{input}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ServiceWithRatingDTO> searchAdventureByName(@PathVariable String input) {
        List<Ship> foundShips = this.shipsService.searchByName(input);
        List<ServiceWithRatingDTO> result = new ArrayList<>();
        for (Ship ship : foundShips) {
            ServiceWithRatingDTO service = new ServiceWithRatingDTO(ship, ratingService.getAvgRatingForBookingService(ship.getId()), ratingService.getNumberOfRatingsForBookingService(ship.getId()));
            result.add(service);
        }
        return result;
    }

    @GetMapping(value = "/search/city/{input}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ServiceWithRatingDTO> searchAdventureByCity(@PathVariable String input) {
        List<Ship> foundShips = this.shipsService.searchByCity(input);
        List<ServiceWithRatingDTO> result = new ArrayList<>();
        for (Ship ship : foundShips) {
            ServiceWithRatingDTO service = new ServiceWithRatingDTO(ship, ratingService.getAvgRatingForBookingService(ship.getId()), ratingService.getNumberOfRatingsForBookingService(ship.getId()));
            result.add(service);
        }
        return result;
    }

    @PostMapping(value = "/available", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public List<ServiceWithRatingDTO> findAvailableEstates(@RequestBody ServiceAvailabilitySearchParametersDTO parameters){
        List<Ship> foundShips = this.shipsService.findAvailable(parameters);
        List<ServiceWithRatingDTO> result = new ArrayList<>();
        for (Ship ship : foundShips) {
            ServiceWithRatingDTO service = new ServiceWithRatingDTO(ship, ratingService.getAvgRatingForBookingService(ship.getId()), ratingService.getNumberOfRatingsForBookingService(ship.getId()));
            result.add(service);
        }
        return result;
    }

}
