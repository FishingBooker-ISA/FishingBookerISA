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

    public void reviewRequest(AccountRequestReviewDTO review) throws InterruptedException {
        AccountRequest request = this.registrationReasonRepository.getById(review.getId());
        request.setDenied(review.getIsDenied());
        request.setDenialReason(review.getDenialReason());
        request.setReviewed(true);
        this.registrationReasonRepository.save(request);
        notifyUser(request.getUser().getId(), request);
    }

    private void notifyUser(int userId,AccountRequest request) throws InterruptedException {
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

    public void reviewDeleteRequest(AccountRequestReviewDTO review) throws InterruptedException {
        AccountDeletionRequest request = this.accountDeletionRequestRepository.getById(review.getId());
        request.setDenied(review.getIsDenied());
        request.setDenialReason(review.getDenialReason());
        request.setReviewed(true);
        this.accountDeletionRequestRepository.save(request);
        notifyUserWhenDeleting(request.getUser().getId(), request);
    }

    private void notifyUserWhenDeleting(int userId, AccountDeletionRequest request) throws InterruptedException {
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
