package app.service;

import app.domain.*;
import app.dto.NewEstateDTO;
import app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
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
    @Autowired
    AdditionalServiceRepository additionalServiceRepository;

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public Estate createNewEstate(NewEstateDTO newEstate, User user) {
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
                newEstate.getTermsOfUse(), newEstate.getCapacity(), newEstate.getIsPercentageTakenFromCanceledReservations(),
                newEstate.getPercentageToTake(), user, newAddress, newEstate.getNumOfBeds(), newEstate.getNumOfRooms()
        );
        estateRepository.save(estate);

        for (var a : newEstate.getAdditionalServiceList()) {
            AdditionalService added = new AdditionalService();
            AdditionalService existingService = additionalServiceRepository
                    .getByBookingServiceIdAndName(estate.getId(), a.getName());

            if (existingService == null) {
                added.setPrice(a.getPrice());
                added.setName(a.getName());
                added.setBookingService(estate);
                additionalServiceRepository.save(added);
            }
            else {
                return null;
            }
        }

        return estate;
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
            if (r.getBookingService().getId().equals(estate.getId()) && (r.getReservationEnd().compareTo(new Date())) >= 0)
                reservations.add(r);
        }

        return reservations.isEmpty();
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void deleteEstate(Estate estate) {
        estateRepository.deleteById(estate.getId());
    }

    public List<Estate> getAll(){
        return estateRepository.findAll();
    }

    public List<Estate> searchByName(String input){
        List<Estate> foundEstates = new ArrayList<>();
        List<Estate> allEstates =  estateRepository.findAll();
        for (Estate estate : allEstates) {
            if(estate.getName().toLowerCase().contains(input.toLowerCase()))
                foundEstates.add(estate);
        }
        return foundEstates;
    }

    public List<Estate> searchByCity(String input){
        List<Estate> foundEstates = new ArrayList<>();
        List<Estate> allEstates =  estateRepository.findAll();
        for (Estate estate : allEstates) {
            if(estate.getAddress().getCity().toLowerCase().contains(input.toLowerCase()))
                foundEstates.add(estate);
        }
        return foundEstates;
    }

    public List<Estate> searchByCapacity(int requestedCapacity){
        List<Estate> foundEstates = new ArrayList<>();
        List<Estate> allEstates =  estateRepository.findAll();
        for (Estate estate : allEstates) {
            if(estate.getCapacity() <= requestedCapacity)
                foundEstates.add(estate);
        }
        return foundEstates;
    }
}
