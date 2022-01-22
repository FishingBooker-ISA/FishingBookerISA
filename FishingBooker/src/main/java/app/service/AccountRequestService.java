package app.service;

import app.domain.AccountDeletionRequest;
import app.domain.AccountRequest;
import app.domain.User;
import app.dto.AccountRequestReviewDTO;
import app.repository.AccountDeletionRequestRepository;
import app.repository.RegistrationReasonRepository;
import app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class AccountRequestService {
    private EmailService emailService;
    private AccountDeletionRequestRepository accountDeletionRequestRepository;
    private UserRepository userRepository;
    private RegistrationReasonRepository registrationReasonRepository;

    @Autowired
    public  AccountRequestService(EmailService emailService, AccountDeletionRequestRepository accountDeletionRequestRepository,
                                  UserRepository userRepository, RegistrationReasonRepository registrationReasonRepository){
        this.emailService = emailService;
        this.accountDeletionRequestRepository = accountDeletionRequestRepository;
        this.userRepository = userRepository;
        this.registrationReasonRepository = registrationReasonRepository;
    }

    public List<AccountRequest> getAllAccountRequests() {
        List<AccountRequest> allRequests = this.registrationReasonRepository.findAll();
        List<AccountRequest> notReviewed = new ArrayList<>();
        for (AccountRequest request : allRequests) {
            if(!request.isReviewed())
                notReviewed.add(request);
        }
        return notReviewed;
    }
    @Transactional(readOnly = false)
    public boolean reviewRequest(AccountRequestReviewDTO review){
        boolean ex = false;
        AccountRequest request = this.registrationReasonRepository.getById(review.getId());
        request.setDenied(review.getIsDenied());
        request.setDenialReason(review.getDenialReason());
        request.setReviewed(true);
        try {
            this.registrationReasonRepository.save(request);
        }catch (Exception e){
            ex = true;
        }
        if(!ex)
            notifyUser(request.getUser().getId(), request);
        return ex;
    }

    private void notifyUser(int userId,AccountRequest request) {
        User user = this.userRepository.getById(userId);
        String mailSubject = "Account Verification";
        String mailContent;
        if(!request.isDenied()){
            user.setVerified(true);
            this.userRepository.save(user);
            mailContent = "Hello,\nYour account has been verified and ready to use. Enjoy!\nFishing Booker";
        }else{
            mailContent = "Hello,\nYour request for an account on our site has been rejected. Reason for rejection is :\n" +
                    request.getDenialReason()+ "\nFishing Booker";
        }
        this.emailService.sendMail(user, mailSubject, mailContent);
    }

    public List<AccountDeletionRequest> getAllDeleteAccountRequests() {
        List<AccountDeletionRequest> allRequests = this.accountDeletionRequestRepository.findAll();
        List<AccountDeletionRequest> notReviewed = new ArrayList<>();
        for (AccountDeletionRequest request : allRequests) {
            if(!request.isReviewed())
                notReviewed.add(request);
        }
        return notReviewed;
    }
    @Transactional(readOnly = false)
    public boolean reviewDeleteRequest(AccountRequestReviewDTO review){
        boolean ex = false;
        AccountDeletionRequest request = this.accountDeletionRequestRepository.getById(review.getId());
        request.setDenied(review.getIsDenied());
        request.setDenialReason(review.getDenialReason());
        request.setReviewed(true);
        try {
            this.accountDeletionRequestRepository.save(request);
        }catch (Exception e){
            ex = true;
        }
        if(!ex)
            notifyUserWhenDeleting(request.getUser().getId(), request);
        return ex;
    }

    private void notifyUserWhenDeleting(int userId, AccountDeletionRequest request) {
        User user = this.userRepository.getById(userId);
        String mailSubject = "Delete My Account Request";
        String mailContent;
        if(!request.isDenied()){
            user.setDeleted(true);
            this.userRepository.save(user);
            mailContent = "Hello,\nYour account has been deleted.\nFishing Booker";
        }else{
            mailContent = "Hello,\nYour request for deleting your account on our site has been rejected. Reason for rejection is :\n" +
                    request.getDenialReason()+ "\nFishing Booker";
        }
        this.emailService.sendMail(user, mailSubject, mailContent);
    }
}
