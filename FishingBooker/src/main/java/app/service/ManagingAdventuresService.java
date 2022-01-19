package app.service;

import app.domain.*;
import app.dto.NewAdventureDTO;
import app.repository.AdditionalServiceRepository;
import app.repository.AddressRepository;
import app.repository.AdventureRepository;
import app.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ManagingAdventuresService {
    AddressRepository addressRepository;
    AdventureRepository adventureRepository;
    ReservationRepository reservationRepository;
    @Autowired
    AdditionalServiceRepository additionalServiceRepository;


    @Autowired
    public ManagingAdventuresService(AddressRepository addressRepository, AdventureRepository adventureRepository,
                                     ReservationRepository reservationRepository)
    {
        this.addressRepository = addressRepository;
        this.adventureRepository = adventureRepository;
        this.reservationRepository = reservationRepository;
    }

    public BookingService createNewAdventure(NewAdventureDTO newAdventureDTO, User currentUser) {

        Address address = new Address(
                newAdventureDTO.getStreet(), newAdventureDTO.getNumber(),
                newAdventureDTO.getCity(), newAdventureDTO.getCountry(),
                newAdventureDTO.getPostcode(), 0, 0
        );

        Address newAddress;
        if (addressAlreadyExists(address) == null) {
            newAddress = addressRepository.save(address);
        }
        else
            newAddress = addressAlreadyExists(address);

        Adventure adventure = new Adventure(
                ServiceType.ADVENTURE, newAdventureDTO.getName(), newAdventureDTO.getPricePerDay(),
                newAdventureDTO.getDescription(),
                newAdventureDTO.getTermsOfUse(),
                newAdventureDTO.getCapacity(), newAdventureDTO.getIsPercentageTakenFromCanceledReservations(),
                newAdventureDTO.getPercentageToTake(), currentUser, newAddress, newAdventureDTO.getInstructorBio()
        );

        adventureRepository.save(adventure);

        for (var a : newAdventureDTO.getAdditionalServiceList()) {
            AdditionalService added = new AdditionalService();
            AdditionalService existingService = additionalServiceRepository
                    .getByBookingServiceIdAndName(adventure.getId(), a.getName());

            if (existingService == null) {
                added.setPrice(a.getPrice());
                added.setName(a.getName());
                added.setBookingService(adventure);
                additionalServiceRepository.save(added);
            }
            else {
                return null;
            }
        }
        return adventure;
    }

    private Address addressAlreadyExists(Address updatedAddress) {
        Address foundAddress = addressRepository.getByCityAndCountryAndStreetAndNumberAndPostcode(
                updatedAddress.getCity(), updatedAddress.getCountry(), updatedAddress.getStreet(),
                updatedAddress.getNumber(), updatedAddress.getPostcode());

        if (foundAddress != null)
            return addressRepository.getById(foundAddress.getId());

        return null;
    }

    public void updateExistingAdventure(NewAdventureDTO adventure, Adventure existingAdventure) {
        Address address = new Address(
                adventure.getStreet(), adventure.getNumber(), adventure.getCity(), adventure.getCountry(),
                adventure.getPostcode(), 0, 0
        );

        if (addressAlreadyExists(address) == null) {
            Address updated = addressRepository.save(address);
            existingAdventure.setAddress(updated);
        }
        else
            existingAdventure.setAddress(addressAlreadyExists(address));

        existingAdventure.setName(adventure.getName());
        existingAdventure.setPricePerDay(adventure.getPricePerDay());
        existingAdventure.setDescription(adventure.getDescription());
        existingAdventure.setTermsOfUse(adventure.getTermsOfUse());
        existingAdventure.setCapacity(adventure.getCapacity());
        existingAdventure.setPercentageTakenFromCanceledReservations(adventure.getIsPercentageTakenFromCanceledReservations());
        existingAdventure.setPercentageToTake(adventure.getPercentageToTake());

        adventureRepository.save(existingAdventure);
    }

    public boolean hasAnyReservations(Adventure adventure) {
        List<Reservation> reservations = new ArrayList<>();

        for ( Reservation r : reservationRepository.findAll()){
            if (r.getBookingService().getId().equals(adventure.getId()) && (r.getReservationEnd().compareTo(new Date())) >= 0)
                reservations.add(r);
        }

        return reservations.isEmpty();

    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void deleteEstate(Adventure adventure) {
        adventureRepository.deleteById(adventure.getId());
    }

    public List<Adventure> searchByName(String input){
        List<Adventure> foundAdventures = new ArrayList<>();
        List<Adventure> allAdventures =  adventureRepository.findAll();
        for (Adventure adventure : allAdventures) {
            if(adventure.getName().toLowerCase().contains(input.toLowerCase()))
                foundAdventures.add(adventure);
        }
        return foundAdventures;
    }

    public List<Adventure> getAll(){
        return adventureRepository.findAll();
    }

    public List<Adventure> searchByCity(String input){
        List<Adventure> foundAdventures = new ArrayList<>();
        List<Adventure> allAdventures =  adventureRepository.findAll();
        for (Adventure adventure : allAdventures) {
            if(adventure.getAddress().getCity().toLowerCase().contains(input.toLowerCase()))
                foundAdventures.add(adventure);
        }
        return foundAdventures;
    }

    public List<Adventure> searchByCapacity(int requestedCapacity){
        List<Adventure> foundAdventures = new ArrayList<>();
        List<Adventure> allAdventures =  adventureRepository.findAll();
        for (Adventure adventure : allAdventures) {
            if(adventure.getCapacity() <= requestedCapacity)
                foundAdventures.add(adventure);
        }
        return foundAdventures;
    }
}