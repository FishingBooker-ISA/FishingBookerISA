package app.controller;

import app.domain.BookingService;
import app.domain.UnavailablePeriod;
import app.domain.User;
import app.dto.UnavailablePeriodDTO;
import app.repository.ServiceRepository;
import app.repository.UnavailablePeriodRepository;
import app.service.ManagingReservationsService;
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
@RequestMapping(value = "api/unavailable")
public class UnavailablePeriodController {
    @Autowired
    private UserService userService;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private UnavailablePeriodRepository unavailablePeriodRepository;
    @Autowired
    private ManagingReservationsService reservationsService;

    @PostMapping(value = "/addUnavailablePeriod", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + " || hasAuthority('ROLE_SHIP_OWNER')" +
            " || hasAuthority('ROLE_INSTRUCTOR')")
    public ResponseEntity<String> addUnavailablePeriod(@RequestBody UnavailablePeriodDTO dto, Principal user) {
        User currentUser = this.userService.findByEmail(user.getName());
        BookingService service = serviceRepository.getById(dto.getServiceId());

        if(!service.getOwner().getId().equals(currentUser.getId())) {
            return new ResponseEntity<>("Unauthorized access", HttpStatus.UNAUTHORIZED);
        }

        try {
            if (reservationsService.addUnavailablePeriod(dto) != null)
                return new ResponseEntity<>("New unavailable period created!", HttpStatus.OK);
            else
                return new ResponseEntity<>("Entered dates overlap with existing reservation!", HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getAllUnavailablePeriods", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UnavailablePeriod>> getAll(int id, Principal user) {
        try {
            return new ResponseEntity<>(unavailablePeriodRepository.findAllByServiceId(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
