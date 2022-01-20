package app.controller;

import app.domain.User;
import app.dto.TimePeriodDTO;
import app.service.MoneyService;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(value = "api/money")
public class MoneyController {
    @Autowired
    private MoneyService moneyService;
    @Autowired
    private UserService userService;

    @PostMapping(value = "/getOwnerMoneyForPeriod", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + "|| hasAuthority('ROLE_SHIP_OWNER')" + " || hasAuthority('ROLE_INSTRUCTOR')")
    public double getOwnerMoneyForPeriod(Principal user, TimePeriodDTO timePeriodDTO){
        User currentUser = userService.findByEmail(user.getName());
        return this.moneyService.getMoneyForPeriod(currentUser.getId(), timePeriodDTO.getStartDate(), timePeriodDTO.getEndDate());
    }

    @PostMapping(value = "/getAppMoneyForPeriod", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public double getAppMoneyForPeriod(TimePeriodDTO timePeriodDTO){
        return this.moneyService.getMoneyForApp(timePeriodDTO.getStartDate(), timePeriodDTO.getEndDate());
    }
}
