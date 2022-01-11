package app.controller;

import app.domain.User;
import app.dto.DeletionRequestDTO;
import app.dto.PasswordChangeDTO;
import app.dto.UserDTO;
import app.service.OwnerProfileService;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import java.security.Principal;

@RestController
@RequestMapping(value = "api/owners")
public class OwnerProfileController {
    @Autowired
    private OwnerProfileService ownerProfileService;
    @Autowired
    private UserService userService;

    @Autowired
    public OwnerProfileController() {
    }

    @PutMapping(value = "/updateProfile", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public ResponseEntity<String> updateOwnersProfile(@RequestBody UserDTO userDto, Principal user) {
        try {
            ownerProfileService.updateUserProfile(userDto, user);
            return new ResponseEntity<>("Owner profile successfully updated!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/changePassword", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public ResponseEntity<String> changePassword(@RequestBody PasswordChangeDTO changeDTO, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        if (!ownerProfileService.checkIfValidOldPassword(currentUser, changeDTO.getOldPassword())) {
            return new ResponseEntity<>("Old password doesn't match!", HttpStatus.BAD_REQUEST);
        }

        try {
            ownerProfileService.changePassword(changeDTO, user);
            return new ResponseEntity<>("Password successfully updated!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/sendDeletionRequest", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')")
    public ResponseEntity<String> sendDeletionRequest(DeletionRequestDTO requestDTO, Principal user) {
        User currentUser = userService.findByEmail(user.getName());

        if (ownerProfileService.checkIfRequestExists(currentUser))
            return new ResponseEntity<>("Request already exists!", HttpStatus.BAD_REQUEST);

        try {
            ownerProfileService.sendAccountDeletionRequest(requestDTO, currentUser);
            return new ResponseEntity<>("Request successfully sent!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
