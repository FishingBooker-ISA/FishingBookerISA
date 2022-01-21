package app.controller;

import app.domain.User;
import app.service.BussinessReportService;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/bussiness")
public class BussinessReportController {
    @Autowired
    UserService userService;
    @Autowired
    BussinessReportService reportService;

    @GetMapping(value = "/getMonthlyReport", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Integer> generateMonthlyReport(Principal user) {
        User currentUser = this.userService.findByEmail(user.getName());
        return reportService.MonthlyReport(currentUser);
    }

    @GetMapping(value = "/getYearlyReport", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Integer> generateYearlyReport(Principal user) {
        User currentUser = this.userService.findByEmail(user.getName());
        return reportService.YearlyReport(currentUser);
    }

    @GetMapping(value = "/getWeeklyReport", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Integer> generateReport(Principal user) {
        User currentUser = this.userService.findByEmail(user.getName());
        return reportService.WeeklyReport(currentUser);
    }
}
