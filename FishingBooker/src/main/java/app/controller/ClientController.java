package app.controller;

import app.domain.User;
import app.dto.DeletionRequestDTO;
import app.service.ClientService;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@RequestMapping(value = "/api/client", produces = MediaType.APPLICATION_JSON_VALUE)
public class ClientController {

    @Autowired
    private ClientService clientService;
    @Autowired
    private UserService userService;

    @PutMapping("/verify/{code}")
    public boolean verify(@PathVariable String code) {
        System.out.println(code);
        return this.clientService.VerifyClient(code);
    }

    @PostMapping(value = "/sendDeletionRequest", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public ResponseEntity<String> sendDeletionRequest(@RequestBody DeletionRequestDTO requestDTO) {
        System.out.println(requestDTO.getReason());
        System.out.println(requestDTO.getUserId());
        try {
            clientService.sendAccountDeletionRequest(requestDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/deletionRequestExists/{id}")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public boolean checkDeletionRequest(@PathVariable int id) {
        return clientService.checkIfRequestExists(id);

    }
}
