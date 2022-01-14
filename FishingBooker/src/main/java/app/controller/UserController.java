package app.controller;

import app.domain.User;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "api/users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/whoami")
    public User user(Principal user) {
        return this.userService.findByEmail(user.getName());
    }

    @GetMapping(value = "/getAllUsers", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<User> getAllAccountRequests() {
        return  this.userService.getAllUsers();
    }

    @PostMapping(value = "/deleteUser")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void reviewRequest(@RequestBody int userId){
        this.userService.deleteUser(userId);
    }

}
