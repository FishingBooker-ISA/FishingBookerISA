package app.controller;

import app.domain.LoyaltyProgram;
import app.dto.LoyaltyProgramDTO;
import app.repository.LoyaltyProgramRepository;
import app.service.LoyaltyProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/loyalty")
public class LoyaltyProgramController {
    @Autowired
    private LoyaltyProgramRepository loyaltyProgramRepository;
    @Autowired
    private LoyaltyProgramService loyaltyProgramService;

    @GetMapping(value = "/getLoyaltyProgram", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')" + " || hasAuthority('ROLE_CLIENT')")
    public LoyaltyProgram getLoyaltyProgram(){
        return this.loyaltyProgramRepository.findAll().get(0);
    }

    @PostMapping(value = "/updateLoyaltyProgram", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> updateLoyalty(@RequestBody LoyaltyProgramDTO program){

        if(program.getPercentForBronze() < 0 || program.getPercentForBronze() > 100 ||
            program.getPercentForSilver() < 0 || program.getPercentForSilver() > 100 ||
                program.getPercentForGold() < 0 || program.getPercentForGold() > 100 ||
                    program.getPointsForBronze() < 0 || program.getPointsForSilver() < 0 ||
                        program.getPointsForGold() < 0 || program.getPercentageForApp() < 0 ||
                            program.getPercentageForApp() > 100 || program.getPointsForOwner() < 0 ||
                                program.getPointsForUser() < 0) {
            return new ResponseEntity<>("Loyalty program could not be updated!", HttpStatus.BAD_REQUEST);
        }
        this.loyaltyProgramService.updateLoyaltyProgram(program);
        return new ResponseEntity<>("Loyalty program updated!", HttpStatus.OK);
    }
}
