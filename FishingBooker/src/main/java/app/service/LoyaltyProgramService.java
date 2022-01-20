package app.service;

import app.domain.LoyaltyProgram;
import app.dto.LoyaltyProgramDTO;
import app.repository.LoyaltyProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoyaltyProgramService {
    private LoyaltyProgramRepository loyaltyProgramRepository;

    @Autowired
    public LoyaltyProgramService(LoyaltyProgramRepository loyaltyProgramRepository){
        this.loyaltyProgramRepository = loyaltyProgramRepository;
    }

    public void updateLoyaltyProgram(LoyaltyProgramDTO program){
        LoyaltyProgram existingLoyaltyProgram = this.loyaltyProgramRepository.findAll().get(0);
        existingLoyaltyProgram.setPointsForBronze(program.getPointsForBronze());
        existingLoyaltyProgram.setPercentForBronze(program.getPercentForBronze());
        existingLoyaltyProgram.setPointsForSilver(program.getPointsForSilver());
        existingLoyaltyProgram.setPercentForSilver(program.getPercentForSilver());
        existingLoyaltyProgram.setPointsForGold(program.getPointsForGold());
        existingLoyaltyProgram.setPercentForGold(program.getPercentForGold());
        existingLoyaltyProgram.setPointsForOwner(program.getPointsForOwner());
        existingLoyaltyProgram.setPointsForUser(program.getPointsForUser());
        existingLoyaltyProgram.setPercentageForApp(program.getPercentageForApp());
        this.loyaltyProgramRepository.save(existingLoyaltyProgram);
    }
}
