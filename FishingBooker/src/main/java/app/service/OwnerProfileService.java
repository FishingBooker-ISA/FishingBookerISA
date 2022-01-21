package app.service;

import app.domain.AccountDeletionRequest;
import app.domain.Address;
import app.domain.User;
import app.dto.DeletionRequestDTO;
import app.dto.PasswordChangeDTO;
import app.dto.UserDTO;
import app.repository.AccountDeletionRequestRepository;
import app.repository.AddressRepository;
import app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.Date;

@Service
@Transactional
public class OwnerProfileService {
    @Autowired
    AddressRepository addressRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AccountDeletionRequestRepository deletionRequestRepository;
    @Autowired
    UserService userService;
    @Autowired
    ManagingEstateService estateService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void updateUserProfile(UserDTO userDTO, Principal user) {
        User currentUser = userService.findByEmail(user.getName());

        Address address = new Address(
                userDTO.getStreet(), userDTO.getNumber(),
                userDTO.getCity(), userDTO.getCountry(),
                userDTO.getPostcode(), 0, 0
        );

        Address newAddress;
        if (estateService.addressAlreadyExists(address) == null) {
            newAddress = addressRepository.save(address);
        } else
            newAddress = estateService.addressAlreadyExists(address);

        currentUser.setFirstName(userDTO.getFirstName());
        currentUser.setLastName(userDTO.getLastName());
        currentUser.setAddress(newAddress);
        currentUser.setPhoneNumber(userDTO.getPhoneNumber());
        currentUser.setShipOwnerRole(userDTO.getShipOwnerRole());

        userRepository.save(currentUser);
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void changePassword(PasswordChangeDTO passwordChangeDTO, Principal user) {
        User currentUser = userService.findByEmail(user.getName());
        currentUser.setPassword(passwordEncoder.encode(passwordChangeDTO.getNewPassword()));
        userRepository.save(currentUser);
    }

    public boolean checkIfValidOldPassword(User user, String oldPassword) {
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void sendAccountDeletionRequest(DeletionRequestDTO requestDTO, User currentUser) {
        AccountDeletionRequest request = new AccountDeletionRequest();
        request.setUser(currentUser);
        request.setReason(requestDTO.getReason());
        request.setReviewed(false);
        request.setDenied(false);
        request.setRequestedDate(new Date());
        deletionRequestRepository.save(request);
    }

    public boolean checkIfRequestExists(User currentUser) {
        AccountDeletionRequest existingRequest = deletionRequestRepository.findByUser(currentUser);

        return existingRequest != null;
    }
}
