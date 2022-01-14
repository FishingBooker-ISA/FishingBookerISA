package app.service;

import app.domain.AccountRequest;
import app.domain.Address;
import app.domain.Role;
import app.domain.User;
import app.dto.AccountRequestForOwners;
import app.dto.NewAdminDTO;
import app.repository.AddressRepository;
import app.repository.RegistrationReasonRepository;
import app.repository.RoleRepository;
import app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    private UserRepository userRepository;
    private AddressRepository addressRepository;
    private PasswordEncoder passwordEncoder;
    private RegistrationReasonRepository registrationReasonRepository;
    private RoleRepository roleRepository;
    @Autowired
    private EmailService emailService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AddressRepository addressRepository, RegistrationReasonRepository registrationReasonRepository,
                       RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.addressRepository = addressRepository;
        this.registrationReasonRepository = registrationReasonRepository;
        this.roleRepository = roleRepository;
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
        return this.userRepository.save(user);
    }
}
