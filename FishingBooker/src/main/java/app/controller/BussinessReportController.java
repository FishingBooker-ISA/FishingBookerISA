package app.controller;

import app.domain.User;
import app.service.BussinessReportService;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "api/bussiness")
public class BussinessReportController {
    @Autowired
    UserService userService;
    @Autowired
    BussinessReportService reportService;

    @GetMapping(value = "/getMonthlyReport", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + " || hasAuthority('ROLE_SHIP_OWNER')"+ " || hasAuthority('ROLE_INSTRUCTOR')")
    public List<Integer> generateMonthlyReport(Principal user) {
        User currentUser = this.userService.findByEmail(user.getName());
        return reportService.monthlyReport(currentUser);
    }

    @GetMapping(value = "/getYearlyReport", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + " || hasAuthority('ROLE_SHIP_OWNER')"+ " || hasAuthority('ROLE_INSTRUCTOR')")
    public List<Integer> generateYearlyReport(Principal user) {
        User currentUser = this.userService.findByEmail(user.getName());
        return reportService.yearlyReport(currentUser);
    }

    @GetMapping(value = "/getWeeklyReport", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + " || hasAuthority('ROLE_SHIP_OWNER')"+ " || hasAuthority('ROLE_INSTRUCTOR')")
    public List<Integer> generateReport(Principal user) {
        User currentUser = this.userService.findByEmail(user.getName());
        return reportService.weeklyReport(currentUser);
    }

    @GetMapping(value = "/getAverageMark", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + " || hasAuthority('ROLE_SHIP_OWNER')"+ " || hasAuthority('ROLE_INSTRUCTOR')")
    public double getAverage(Principal user) {
        User currentUser = this.userService.findByEmail(user.getName());
        return reportService.getAverageRating(currentUser);
    }
}
