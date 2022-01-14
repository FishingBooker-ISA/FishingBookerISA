package app.service;

import app.domain.*;
import app.dto.ClientDTO;
import app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.Date;
import java.util.UUID;

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

    public boolean VerifyClient(String code){
        Client client = clientRepository.findClientByVerificationCode(code);
        if(client == null)
            return false;
        client.setVerified(true);
        clientRepository.save(client);
        return true;
    }






}
