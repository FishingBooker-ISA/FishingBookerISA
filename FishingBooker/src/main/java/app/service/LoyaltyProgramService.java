package app.service;

import app.domain.LoyaltyProgram;
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

    public void updateLoyaltyProgram(LoyaltyProgram program){
        this.loyaltyProgramRepository.save(program);
    }
}
