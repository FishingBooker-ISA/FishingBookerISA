package app.controller;

import app.domain.AccountDeletionRequest;
import app.domain.AccountRequest;
import app.dto.AccountRequestReviewDTO;
import app.service.AccountRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/accounts")
public class AccountController {
    private AccountRequestService accountRequestService;

    @Autowired
    public AccountController(AccountRequestService accountRequestService) {
        this.accountRequestService = accountRequestService;
    }

    @GetMapping(value = "/getAllAccountRequests", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<AccountRequest> getAllAccountRequests() {
        return  this.accountRequestService.getAllAccountRequests();
    }

    @PostMapping(value = "/reviewRequest", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> reviewRequest(@RequestBody AccountRequestReviewDTO request) {
        if(!this.accountRequestService.reviewRequest(request))
            return new ResponseEntity<>("Review submitted", HttpStatus.OK);
        else
            return new ResponseEntity<>("This request has already been reviewed.",HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/getAllDeleteAccountRequests", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<AccountDeletionRequest> getAllDeleteAccountRequests() {
        return  this.accountRequestService.getAllDeleteAccountRequests();
    }

    @PostMapping(value = "/reviewDeleteRequest", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> reviewDeleteRequest(@RequestBody AccountRequestReviewDTO request){

        if(!this.accountRequestService.reviewDeleteRequest(request))
            return new ResponseEntity<>("Review submitted", HttpStatus.OK);
        else
            return new ResponseEntity<>("This request has already been reviewed.",HttpStatus.BAD_REQUEST);
    }
}
