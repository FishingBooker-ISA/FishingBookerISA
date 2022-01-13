package app.controller;

import app.domain.Adventure;
import app.domain.User;
import app.dto.NewAdventureDTO;
import app.repository.AdventureRepository;
import app.service.ManagingAdventuresService;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/adventures")
public class AdventuresController {
    @Autowired
    private UserService userService;
    @Autowired
    private ManagingAdventuresService managingAdventuresService;
    @Autowired
    private AdventureRepository adventuresRepository;

    @GetMapping(value = "/getAdventuresForInstructor", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
    public List<Adventure> getAdventuresForInstructor(Principal user){
        User currentUser = this.userService.findByEmail(user.getName());

        return adventuresRepository.findByOwnerId(currentUser.getId());
    }

    @GetMapping(value = "/findAdventureByName", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
    public List<Adventure> findEstatesByName(Principal user, String name) {
        User currentUser = this.userService.findByEmail(user.getName());
        List<Adventure> foundAdventures = new ArrayList<>();

        for (Adventure adventure : adventuresRepository.findByOwnerId(currentUser.getId())) {
            if(adventure.getName().toLowerCase().contains(name.toLowerCase()))
                foundAdventures.add(adventure);
        }

        return foundAdventures;
    }

    @GetMapping(value = "/getAdventureById", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
    public Adventure getAdventureById(Principal user, int id){
        User currentUser = this.userService.findByEmail(user.getName());

        for (Adventure adventure : adventuresRepository.findByOwnerId(currentUser.getId())) {
            if(adventure.getId() == id)
                return adventure;
        }

        return null;
    }

    @PostMapping(value = "/createAdventure")
    @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
    public ResponseEntity<String> createAdventure(@RequestBody NewAdventureDTO newAdventureDTO, Principal user) {
        Adventure existingAdventure = adventuresRepository.findByName(newAdventureDTO.getName());

        if (existingAdventure != null) {
            return new ResponseEntity<>("Instructor already has an estate with this name!", HttpStatus.BAD_REQUEST);
        }

        try {
            User currentUser = userService.findByEmail(user.getName());
            managingAdventuresService.createNewAdventure(newAdventureDTO, currentUser);
            return new ResponseEntity<>("Adventure created!", HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/updateAdventure")
    @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
    public ResponseEntity<String> updateAdventure(@RequestBody NewAdventureDTO adventure, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        Adventure existingAdventure = adventuresRepository.getById(adventure.getId());

        if (existingAdventure == null) {
            return new ResponseEntity<>("Entity doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        if (!existingAdventure.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>("Unauthorized operation!", HttpStatus.UNAUTHORIZED);
        }

        try {
            managingAdventuresService.updateExistingAdventure(adventure, existingAdventure);
            return new ResponseEntity<>("Adventure updated!", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/deleteAdventure/{id}")
    @PreAuthorize("hasAuthority('ROLE_INSTRUCTOR')")
    public ResponseEntity<String> deleteAdventure(@PathVariable int id, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        Adventure existingAdventure = adventuresRepository.getById(id);

        if (existingAdventure == null) {
            return new ResponseEntity<>("Entity doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        if (!existingAdventure.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>("Unauthorized operation!", HttpStatus.UNAUTHORIZED);
        }

        if(managingAdventuresService.hasAnyReservations(existingAdventure)) {
            return new ResponseEntity<>("Adventure has reservations and can't be deleted!", HttpStatus.BAD_REQUEST);
        }

        try {
            managingAdventuresService.deleteEstate(existingAdventure);
            return new ResponseEntity<>("Estate updated!", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
