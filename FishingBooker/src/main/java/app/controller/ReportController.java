package app.controller;

import app.domain.Report;
import app.dto.ReportReviewDTO;
import app.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/reports")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping(value = "/getReportsToConsider", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Report> getReportsToConsider(){
        return this.reportService.getReportsToConsider();
    }

    @PostMapping(value = "/reviewReport", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void reviewReport(@RequestBody ReportReviewDTO review) {
        this.reportService.reviewReport(review);
    }
}
