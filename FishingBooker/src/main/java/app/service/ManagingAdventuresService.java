package app.service;

import app.domain.*;
import app.dto.NewAdventureDTO;
import app.repository.AddressRepository;
import app.repository.AdventureRepository;
import app.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ManagingAdventuresService {
    AddressRepository addressRepository;
    AdventureRepository adventureRepository;
    ReservationRepository reservationRepository;


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
                ServiceType.ADVENTURE, newAdventureDTO.getName(), newAdventureDTO.getPricePerDay(), newAdventureDTO.getDescription(),
                newAdventureDTO.getTermsOfUse(), newAdventureDTO.getAdditionalEquipment(), null,
                null, newAdventureDTO.getCapacity(), newAdventureDTO.getIsPercentageTakenFromCanceledReservations(),
                newAdventureDTO.getPercentageToTake(), currentUser, newAddress, newAdventureDTO.getInstructorBio()
        );

        adventureRepository.save(adventure);
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
        existingAdventure.setAdditionalEquipment(adventure.getAdditionalEquipment());
        existingAdventure.setCapacity(adventure.getCapacity());
        existingAdventure.setPercentageTakenFromCanceledReservations(adventure.getIsPercentageTakenFromCanceledReservations());
        existingAdventure.setPercentageToTake(adventure.getPercentageToTake());

        adventureRepository.save(existingAdventure);
    }

    public boolean hasAnyReservations(Adventure adventure) {
        List<Reservation> reservations = new ArrayList<>();

        for ( Reservation r : reservationRepository.findAll()){
            if (r.getBookingService().getId().equals(adventure.getId()))
                reservations.add(r);
        }

        return reservations.isEmpty();

    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void deleteEstate(Adventure adventure) {
        adventureRepository.deleteById(adventure.getId());
    }
}