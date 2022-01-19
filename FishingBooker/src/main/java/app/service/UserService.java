package app.service;

import app.domain.*;
import app.dto.AccountRequestForOwners;
import app.dto.ClientDTO;
import app.dto.NewAdminDTO;
import app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
    private UserRepository userRepository;
    private ClientRepository clientRepository;
    private AddressRepository addressRepository;
    private PasswordEncoder passwordEncoder;
    private RegistrationReasonRepository registrationReasonRepository;
    private RoleRepository roleRepository;
    @Autowired
    private EmailService emailService;

    @Autowired
    public UserService(UserRepository userRepository,ClientRepository clientRepository, PasswordEncoder passwordEncoder,
                       AddressRepository addressRepository, RegistrationReasonRepository registrationReasonRepository,
                       RoleRepository roleRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.passwordEncoder = passwordEncoder;
        this.addressRepository = addressRepository;
        this.registrationReasonRepository = registrationReasonRepository;
        this.roleRepository = roleRepository;
        this.emailService = emailService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", email));
        } else {
            return user;
        }
    }

    public User findByEmail(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }

    public User addOwner(AccountRequestForOwners userRequest) {
        User user = new User();
        Address address = new Address();
        AccountRequest request = new AccountRequest();

        address.setStreet(userRequest.getStreet());
        address.setNumber(userRequest.getNumber());
        address.setCity(userRequest.getCity());
        address.setCountry(userRequest.getCountry());
        address.setPostcode(userRequest.getPostcode());

        Address addedAddress = this.addressRepository.save(address);
        Role role = roleRepository.findByName(userRequest.getRole());

        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setAddress(addedAddress);
        user.setVerified(true);
        user.setRole(role);
        user.setPhoneNumber(userRequest.getPhoneNumber());
        user.setShipOwnerRole(userRequest.getShipOwnerRole());
        User newUser = this.userRepository.save(user);

        request.setReviewed(false);
        request.setReason(userRequest.getReason());
        request.setUser(newUser);
        this.registrationReasonRepository.save(request);
        return newUser;
    }

    public User addAdmin(NewAdminDTO adminRequest) {

        User user = new User();
        Address address = new Address();

        address.setStreet(adminRequest.getStreet());
        address.setNumber(adminRequest.getNumber());
        address.setCity(adminRequest.getCity());
        address.setCountry(adminRequest.getCountry());
        address.setPostcode(adminRequest.getPostcode());

        Address addedAddress = this.addressRepository.save(address);
        Role role = roleRepository.findByName("ROLE_ADMIN");

        user.setEmail(adminRequest.getEmail());
        user.setPassword(passwordEncoder.encode("admin"));
        user.setFirstName(adminRequest.getFirstName());
        user.setLastName(adminRequest.getLastName());
        user.setAddress(addedAddress);
        user.setVerified(true);
        user.setRole(role);
        user.setPhoneNumber(adminRequest.getPhoneNumber());
        user.setFirstTime(true);
        return this.userRepository.save(user);
    }

    public User addClient(ClientDTO userRequest) {
        Client client = new Client();
        Address address = new Address();

        address.setStreet(userRequest.getStreet());
        address.setNumber(userRequest.getNumber());
        address.setCity(userRequest.getCity());
        address.setCountry(userRequest.getCountry());
        address.setPostcode(userRequest.getPostcode());

        Address addedAddress = this.addressRepository.save(address);
        Role role = roleRepository.findByName("ROLE_CLIENT");

        client.setEmail(userRequest.getEmail());
        client.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        client.setFirstName(userRequest.getFirstName());
        client.setLastName(userRequest.getLastName());
        client.setAddress(addedAddress);
        client.setVerified(false);
        client.setRole(role);
        client.setPhoneNumber(userRequest.getPhoneNumber());
        client.setPoints(0);
        client.setNumOfPenalties(0);
        client.setVerificationCode(UUID.randomUUID().toString());
        client.setDeleted(false);
        Client addedClient = this.userRepository.save(client);
        this.sendVerificationEmail(addedClient.getId());


        return addedClient;
    }

    private void sendVerificationEmail(int clientId) {
        Client client = this.clientRepository.getById(clientId);
        String mailSubject = "FishingBooker registration";
        String mailContent;
        mailContent = "Hello "+ client.getFirstName() +",\n\nThank you for your registration. Click on the the link below to activate your account.\nhttp://localhost:4200/verifyClient/"+client.getVerificationCode()+" \n\n Fishing Booker";

        this.emailService.sendMail(client, mailSubject, mailContent);
    }

    public List<User> getAllUsers() {
        List<User> allUsers = this.userRepository.findAll();
        List<User> validUsers = new ArrayList<>();
        for (User u: allUsers
        ) {
            if(u.isVerified() && !u.isDeleted())
                validUsers.add(u);
        }

        return validUsers;
    }

    public void deleteUser(int userId) {
        User user = this.userRepository.getById(userId);
        user.setDeleted(true);
        user.setVerified(false);
        this.userRepository.save(user);
    }

    public void changePasswordForAdmin(String password, int id) {
        User user = this.userRepository.getById(id);
        user.setPassword(passwordEncoder.encode(password));
        user.setFirstTime(false);
        this.userRepository.save(user);
        this.notifyUser(user);
    }
    private void notifyUser(User user) {
        String mailSubject = "New Account";
        String mailContent = "Hello,\nNew account for you has been made. To login use password 'admin' and your mail. " +
                "\nFishing Booker";
        this.emailService.sendMail(user, mailSubject, mailContent);
    }
}
