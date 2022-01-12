package app.controller;

import app.domain.BookingService;
import app.domain.Reservation;
import app.domain.User;
import app.dto.ReportDTO;
import app.dto.ReservationDTO;
import app.repository.ReservationRepository;
import app.repository.ServiceRepository;
import app.repository.UserRepository;
import app.service.ManagingReservationsService;
import app.service.ReportService;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "api/reservations")
public class ReservationsController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private ManagingReservationsService reservationsService;
    @Autowired
    private ReportService reportService;

    @PostMapping(value = "/createReservation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public ResponseEntity<String> createReservation(@RequestBody ReservationDTO reservationDTO, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        User client = userRepository.getById(reservationDTO.getUserId());
        BookingService service = serviceRepository.getById(reservationDTO.getServiceId());

        Reservation lastingReservation = reservationsService.getLastingReservationForUser(client,
                reservationDTO.getServiceId());
        if (lastingReservation == null)
            return new ResponseEntity<>("Client doesn't have any lasting reservations!", HttpStatus.BAD_REQUEST);

        if (!currentUser.getId().equals(service.getOwner().getId()))
            return new ResponseEntity<>("Logged in user isn't the owner of estate!", HttpStatus.UNAUTHORIZED);

        if (!client.getRole().getName().equals("ROLE_CLIENT"))
            return new ResponseEntity<>("User must be a client!", HttpStatus.BAD_REQUEST);

        try {
            if (reservationsService.createReservationForUser(reservationDTO) != null)
                return new ResponseEntity<>("New reservation created!", HttpStatus.OK);
            else
                return new ResponseEntity<>("Entered dates overlap with existing reservation!", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getReservationHistory", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public List<Reservation> getReservationHistory(int id, Principal user) {
        return reservationsService.getReservationHistory(id);
    }

    @PostMapping(value = "/createReport", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public ResponseEntity<String> submitReport(@RequestBody ReportDTO reportDTO, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        Reservation reservation = reservationRepository.getById(reportDTO.getReservationId());
        BookingService service = reservation.getBookingService();

        if (service == null) {
            return new ResponseEntity<>("Service doesn't exist", HttpStatus.BAD_REQUEST);
        }

        if (reservation.getReservationEnd().compareTo(new Date()) >= 0)
            return new ResponseEntity<>("Reservation isn't finished!", HttpStatus.BAD_REQUEST);

        if (!currentUser.getId().equals(service.getOwner().getId()))
            return new ResponseEntity<>("Unauthorized access!", HttpStatus.UNAUTHORIZED);

        try {
            reportService.createReport(reportDTO);
            return new ResponseEntity<>("Report successfully submitted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getUserInformation", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public ResponseEntity<User> getUserInformation(int reservationId, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        Reservation reservation = reservationRepository.getById(reservationId);

        if (!reservation.getBookingService().getOwner().getId().equals(currentUser.getId()))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

        if (reservation.getUser() == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(reservation.getUser(), HttpStatus.OK);
    }
}




