package app.service;

import app.domain.*;
import app.dto.NewEstateDTO;
import app.repository.AddressRepository;
import app.repository.EstateRepository;
import app.repository.ReservationRepository;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@Transactional
public class ManagingEstateService {
    Logger logger = LoggerFactory.getLogger(this.getClass());
    AddressRepository addressRepository;
    EstateRepository estateRepository;
    ReservationRepository reservationRepository;

    @Autowired
    public ManagingEstateService(AddressRepository addressRepository, EstateRepository estateRepository,
                                 ReservationRepository reservationRepository)
    {
        this.addressRepository = addressRepository;
        this.estateRepository = estateRepository;
        this.reservationRepository = reservationRepository;
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void createNewEstate(NewEstateDTO newEstate, User user) throws Exception {
        Address address = new Address(
                newEstate.getStreet(), newEstate.getNumber(),
                newEstate.getCity(), newEstate.getCountry(),
                newEstate.getPostcode(), 0, 0
        );

        Address newAddress;
        if (addressAlreadyExists(address) == null) {
            newAddress = addressRepository.save(address);
        }
        else
            newAddress = addressAlreadyExists(address);

        Estate estate = new Estate(
                ServiceType.Estate, newEstate.getName(), newEstate.getPricePerDay(), newEstate.getDescription(),
                newEstate.getTermsOfUse(), newEstate.getAdditionalEquipment(), newEstate.getAvailableFrom(),
                newEstate.getAvailableTo(), newEstate.getCapacity(), newEstate.getIsPercentageTakenFromCanceledReservations(),
                newEstate.getPercentageToTake(), user, newAddress, newEstate.getNumOfBeds(), newEstate.getNumOfRooms()
        );

        estateRepository.save(estate);
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void updateExistingEstate(NewEstateDTO estateDTO, Estate existingEstate) {
        Address address = new Address(
                estateDTO.getStreet(), estateDTO.getNumber(), estateDTO.getCity(), estateDTO.getCountry(),
                estateDTO.getPostcode(), 0, 0
        );

        if (addressAlreadyExists(address) == null) {
            Address updated = addressRepository.save(address);
            existingEstate.setAddress(updated);
        }
        else
            existingEstate.setAddress(addressAlreadyExists(address));

        existingEstate.setName(estateDTO.getName());
        existingEstate.setPricePerDay(estateDTO.getPricePerDay());
        existingEstate.setDescription(estateDTO.getDescription());
        existingEstate.setTermsOfUse(estateDTO.getTermsOfUse());
        existingEstate.setAdditionalEquipment(estateDTO.getAdditionalEquipment());
        existingEstate.setAvailableFrom(estateDTO.getAvailableFrom());
        existingEstate.setAvailableTo(estateDTO.getAvailableTo());
        existingEstate.setCapacity(estateDTO.getCapacity());
        existingEstate.setPercentageTakenFromCanceledReservations(estateDTO.getIsPercentageTakenFromCanceledReservations());
        existingEstate.setPercentageToTake(estateDTO.getPercentageToTake());

        existingEstate.setNumOfRooms(estateDTO.getNumOfRooms());
        existingEstate.setNumOfBeds(estateDTO.getNumOfBeds());

        estateRepository.save(existingEstate);
    }

    public Address addressAlreadyExists(Address updatedAddress) {
        Address foundAddress = addressRepository.getByCityAndCountryAndStreetAndNumberAndPostcode(
                updatedAddress.getCity(), updatedAddress.getCountry(), updatedAddress.getStreet(),
                updatedAddress.getNumber(), updatedAddress.getPostcode());

        if (foundAddress != null)
            return addressRepository.getById(foundAddress.getId());

        return null;
    }

    public boolean hasAnyReservations(Estate estate) {
        List<Reservation> reservations = new ArrayList<>();

        for ( Reservation r : reservationRepository.findAll()){
            if (r.getBookingService().getId() == estate.getId())
                reservations.add(r);
        }

        if (reservations.isEmpty())
            return false;
        else
            return true;
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void deleteEstate(Estate estate) {
        estateRepository.deleteById(estate.getId());
    }
}














