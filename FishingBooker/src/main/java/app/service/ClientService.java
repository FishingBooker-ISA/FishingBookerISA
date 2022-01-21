package app.service;

import app.domain.*;
import app.dto.DeletionRequestDTO;
import app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;

@Service
@Transactional
public class ClientService {
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    EmailService emailService;
    @Autowired
    AddressRepository addressRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    AccountDeletionRequestRepository deletionRequestRepository;
    @Autowired
    UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean verifyClient(String code){
        Client client = clientRepository.findClientByVerificationCode(code);
        if(client == null)
            return false;
        client.setVerified(true);
        clientRepository.save(client);
        return true;
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void sendAccountDeletionRequest(DeletionRequestDTO requestDTO) {
        if (this.checkIfRequestExists(requestDTO.getUserId()))
            return;
        User currentUser = clientRepository.getById(requestDTO.getUserId());
        AccountDeletionRequest request = new AccountDeletionRequest();
        request.setUser(currentUser);
        request.setReason(requestDTO.getReason());
        request.setReviewed(false);
        request.setDenied(false);
        request.setRequestedDate(new Date());
        deletionRequestRepository.save(request);
    }

    public boolean checkIfRequestExists(int id) {
        User currentUser = clientRepository.getById(id);
        AccountDeletionRequest existingRequest = deletionRequestRepository.findByUser(currentUser);
        return (existingRequest != null);
    }

    public double getPointsNumber(int id) {
        Client client = clientRepository.getById(id);
        return client.getPoints();
    }

    public int getPenaltiesNumber(int id) {
        Client client = clientRepository.getById(id);
        int penalties = client.getNumOfPenalties();
        return penalties;
    }






}
