package app.controller;

import javax.servlet.http.HttpServletResponse;

import app.domain.User;
import app.dto.*;
import app.service.UserService;
import app.util.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

//Kontroler zaduzen za autentifikaciju korisnika
@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {
    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;


    // Prvi endpoint koji pogadja korisnik kada se loguje.
    // Tada zna samo svoje korisnicko ime i lozinku i to prosledjuje na backend.
    @PostMapping("/login")
    public ResponseEntity<UserTokenState> createAuthenticationToken(
            @RequestBody JwtAuthenticationRequest authenticationRequest, HttpServletResponse response) {

        // Ukoliko kredencijali nisu ispravni, logovanje nece biti uspesno, desice se
        // AuthenticationException
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequest.getUsername(), authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Ukoliko je autentifikacija uspesna, ubaci korisnika u trenutni security
        // kontekst
        User user = (User) authentication.getPrincipal();
        String jwt = tokenUtils.generateToken(user.getEmail());
        int expiresIn = tokenUtils.getExpiredIn();

        // Vrati token kao odgovor na uspesnu autentifikaciju
        return ResponseEntity.ok(new UserTokenState(jwt, expiresIn));
    }

    @PostMapping("/signupForOwners")
    public ResponseEntity<User> addOwner(@RequestBody AccountRequestForOwners userRequest, UriComponentsBuilder ucBuilder) {

        User existUser = this.userService.findByEmail(userRequest.getEmail());

        if (existUser != null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        User user = this.userService.addOwner(userRequest);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/signupForClients")
    public ResponseEntity<User> addClient(@RequestBody ClientDTO newClient, UriComponentsBuilder ucBuilder) throws InterruptedException {

        User existUser = this.userService.findByEmail(newClient.getEmail());

        if (existUser != null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        User user = this.userService.addClient(newClient);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping(value = "/addAdmin", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> addAdmin(@RequestBody NewAdminDTO adminRequest, UriComponentsBuilder ucBuilder) {

        User existUser = this.userService.findByEmail(adminRequest.getEmail());

        if (existUser != null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        User user = this.userService.addAdmin(adminRequest);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
}
