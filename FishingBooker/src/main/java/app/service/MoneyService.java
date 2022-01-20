package app.service;

import app.domain.*;
import app.repository.AppMoneyRepository;
import app.repository.OwnerMoneyRepository;
import app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class MoneyService {
    private AppMoneyRepository appMoneyRepository;
    private OwnerMoneyRepository ownerMoneyRepository;
    private LoyaltyProgramService loyaltyProgramService;
    private UserRepository userRepository;

    @Autowired
    public MoneyService(AppMoneyRepository appMoneyRepository, OwnerMoneyRepository ownerMoneyRepository,
                        LoyaltyProgramService loyaltyProgramService, UserRepository userRepository){
        this.appMoneyRepository = appMoneyRepository;
        this.ownerMoneyRepository = ownerMoneyRepository;
        this.userRepository = userRepository;
        this.loyaltyProgramService = loyaltyProgramService;
    }

    public void manageMoneyForNewReservation(Reservation newReservation) {
        LoyaltyProgram ourLoyalty = this.loyaltyProgramService.getLoyaltyProgram();
        double percentageForApp = ourLoyalty.getPercentageForApp();
        AppMoney appMoney = new AppMoney();
        appMoney.setDate(new Date());
        appMoney.setMoney(newReservation.getPrice()*percentageForApp/100);
        this.appMoneyRepository.save(appMoney);

        User owner = this.userRepository.getById(newReservation.getBookingService().getOwner().getId());
        OwnerMoney ownerMoney = new OwnerMoney();
        ownerMoney.setOwner(owner);
        ownerMoney.setDate(new Date());
        double moneyFromReservation;

        if(owner.getUserType() == UserType.BRONZE)
        {
            moneyFromReservation = newReservation.getPrice() * (100 + ourLoyalty.getPercentForBronze()) / 100;
        }
        else if(owner.getUserType() == UserType.SILVER)
        {
            moneyFromReservation = newReservation.getPrice() * (100 + ourLoyalty.getPercentForSilver()) / 100;
        }
        else if(owner.getUserType() == UserType.GOLD)
        {
            moneyFromReservation = newReservation.getPrice() * (100 + ourLoyalty.getPercentForGold()) / 100;
        }else {
            moneyFromReservation = newReservation.getPrice();
        }

        ownerMoney.setMoney(moneyFromReservation);
        this.ownerMoneyRepository.save(ownerMoney);
    }

    public double applyDiscount(int clientId, double price){
        User client = this.userRepository.getById(clientId);
        LoyaltyProgram ourLoyalty = this.loyaltyProgramService.getLoyaltyProgram();

        double reservationPrice;

        if(client.getUserType() == UserType.BRONZE)
        {
            reservationPrice = price * (100 - ourLoyalty.getPercentForBronze()) / 100;
        }
        else if(client.getUserType() == UserType.SILVER)
        {
            reservationPrice = price * (100 - ourLoyalty.getPercentForSilver()) / 100;
        }
        else if(client.getUserType() == UserType.GOLD)
        {
            reservationPrice = price * (100 - ourLoyalty.getPercentForGold()) / 100;
        }else {
            reservationPrice = price;
        }

        return reservationPrice;
    }

    public void managePointsForNewReservation(Reservation newReservation) {
        LoyaltyProgram ourLoyalty = this.loyaltyProgramService.getLoyaltyProgram();
        User client = this.userRepository.getById(newReservation.getUser().getId());
        User owner = this.userRepository.getById(newReservation.getBookingService().getOwner().getId());

        double clientPoints = (client.getPoints() + ourLoyalty.getPointsForUser());
        double ownerPoints = owner.getPoints() + ourLoyalty.getPointsForOwner();

        client.setPoints(clientPoints);
        client.setUserType(getType(clientPoints));
        this.userRepository.save(client);

        owner.setPoints(ownerPoints);
        owner.setUserType(getType(ownerPoints));
        this.userRepository.save(owner);
    }

    public UserType getType(double points){
        LoyaltyProgram ourLoyalty = this.loyaltyProgramService.getLoyaltyProgram();
        if(points > ourLoyalty.getPointsForBronze() && points < ourLoyalty.getPointsForSilver())
            return UserType.BRONZE;
        else if(points > ourLoyalty.getPointsForSilver() && points < ourLoyalty.getPointsForGold())
            return UserType.SILVER;
        else if(points > ourLoyalty.getPointsForGold())
            return UserType.GOLD;
        else
            return UserType.REGULAR;
    }
}
