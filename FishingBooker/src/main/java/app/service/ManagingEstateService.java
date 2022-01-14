package app.service;

import app.domain.*;
import app.dto.NewEstateDTO;
import app.repository.AddressRepository;
import app.repository.EstateRepository;
import app.repository.ReservationRepository;
import app.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ManagingEstateService {
    @Autowired
    AddressRepository addressRepository;
    @Autowired
    EstateRepository estateRepository;
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    ServiceRepository serviceRepository;

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void createNewEstate(NewEstateDTO newEstate, User user) {
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
                ServiceType.ESTATE, newEstate.getName(), newEstate.getPricePerDay(), newEstate.getDescription(),
                newEstate.getTermsOfUse(), newEstate.getAdditionalEquipment(), newEstate.getCapacity(), newEstate.getIsPercentageTakenFromCanceledReservations(),
                newEstate.getPercentageToTake(), user, newAddress, newEstate.getNumOfBeds(), newEstate.getNumOfRooms()
        );

        estateRepository.save(estate);
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void updateExistingEstate(NewEstateDTO estateDTO, Estate existingEstate) {
        create(existingEstate, estateDTO, existingEstate.getOwner());
        estateRepository.save(existingEstate);
    }

    private Estate create(Estate estate, NewEstateDTO dto, User owner) {
        Address address = new Address(
                dto.getStreet(), dto.getNumber(), dto.getCity(), dto.getCountry(),
                dto.getPostcode(), 0, 0
        );

        if (addressAlreadyExists(address) == null) {
            Address updated = addressRepository.save(address);
            estate.setAddress(updated);
        }
        else
            estate.setAddress(addressAlreadyExists(address));

        estate.setName(dto.getName());
        estate.setType(ServiceType.ESTATE);
        estate.setPricePerDay(dto.getPricePerDay());
        estate.setDescription(dto.getDescription());
        estate.setTermsOfUse(dto.getTermsOfUse());
        estate.setAdditionalEquipment(dto.getAdditionalEquipment());
        estate.setCapacity(dto.getCapacity());
        estate.setPercentageTakenFromCanceledReservations(dto.getIsPercentageTakenFromCanceledReservations());
        estate.setPercentageToTake(dto.getPercentageToTake());
        estate.setOwner(owner);
        estate.setNumOfRooms(dto.getNumOfRooms());
        estate.setNumOfBeds(dto.getNumOfBeds());
        return estate;
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
            if (r.getBookingService().getId().equals(estate.getId()))
                reservations.add(r);
        }

        return reservations.isEmpty();
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void deleteEstate(Estate estate) {
        estateRepository.deleteById(estate.getId());
    }
}
