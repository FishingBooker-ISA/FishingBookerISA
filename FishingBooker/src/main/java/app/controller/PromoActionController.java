package app.controller;

import app.domain.BookingService;
import app.domain.PromoAction;
import app.domain.User;
import app.dto.PromoActionDTO;
import app.repository.ServiceRepository;
import app.service.PromoActionService;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "api/promoActions")
public class PromoActionController {
    @Autowired
    private UserService userService;
    @Autowired
    private PromoActionService promoActionService;
    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping(value = "/getAllActionsForService", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PromoAction>> getActionsForService(int id, Principal user) {
        return new ResponseEntity<>(promoActionService.getAllActions(id), HttpStatus.OK);
    }

    @PostMapping(value = "/addPromoAction", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + " || hasAuthority('ROLE_SHIP_OWNER')" + " || hasAuthority('ROLE_INSTRUCTOR')")
    public ResponseEntity<String> createNewPromoAction(@Valid @RequestBody PromoActionDTO dto, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        BookingService service = serviceRepository.getById(dto.getBookingServiceId());

        if(!service.getOwner().getId().equals(currentUser.getId())) {
            return new ResponseEntity<>("Unauthorized access!", HttpStatus.UNAUTHORIZED);
        }

        try {
            if (promoActionService.createNewPromoAction(dto) != null) {
                return new ResponseEntity<>("New promo action created!", HttpStatus.OK);
            }
            else
                return new ResponseEntity<>("Entered dates overlap with existing reservation!", HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/updatePromoAction", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + " || hasAuthority('ROLE_SHIP_OWNER')" + " || hasAuthority('ROLE_INSTRUCTOR')")
    public ResponseEntity<String> updatePromoAction(@Valid @RequestBody PromoActionDTO dto, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        BookingService service = serviceRepository.getById(dto.getBookingServiceId());

        if(!service.getOwner().getId().equals(currentUser.getId())) {
            return new ResponseEntity<>("Unauthorized access!", HttpStatus.UNAUTHORIZED);
        }

        try {
            if (promoActionService.updateAction(dto) != null) {
                return new ResponseEntity<>("Promo action updated!", HttpStatus.OK);
            }
            else
                return new ResponseEntity<>("Entered dates overlap with existing reservation!", HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
