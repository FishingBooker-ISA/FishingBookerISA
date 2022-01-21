package app.service;

import app.domain.*;
import app.dto.NavigationToolDTO;
import app.dto.ShipDTO;
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
public class ManagingShipsService {
    @Autowired
    AddressRepository addressRepository;
    @Autowired
    ShipRepository shipRepository;
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    AdditionalServiceRepository additionalServiceRepository;
    @Autowired
    ManagingEstateService estateService;
    @Autowired
    ShipNavigationToolRepository toolRepository;

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public Ship createNewShip(ShipDTO dto, User user) {
        Address address = new Address(
                dto.getStreet(), dto.getNumber(),
                dto.getCity(), dto.getCountry(),
                dto.getPostcode(), dto.getLongitude(), dto.getLatitude()
        );

        Address newAddress;
        if (estateService.addressAlreadyExists(address) == null) {
            newAddress = addressRepository.save(address);
        }
        else
            newAddress = estateService.addressAlreadyExists(address);

        Ship ship = new Ship(ServiceType.SHIP, dto.getName(), dto.getPricePerDay(), dto.getDescription(), dto.getTermsOfUse(),
                dto.getCapacity(), dto.getIsPercentageTakenFromCanceledReservations(), dto.getPercentageToTake(),
                user, newAddress, dto.getLength(), dto.getNumOfEngines(), dto.getPowerOfEngines(), dto.getMaxSpeed(), dto.getShipType());

        shipRepository.save(ship);

        for (var a : dto.getNavigationTools()) {
            ShipNavigationTool tool = new ShipNavigationTool();

            if (toolRepository.getByNameAndShipId(a.getName(), a.getShipId()) == null) {
                tool.setName(a.getName());
                tool.setDescription(a.getDescription());
                tool.setShip(ship);
                toolRepository.save(tool);
            }
            else {
                return null;
            }
        }

        AdditionalService added = new AdditionalService();
        for (var a : dto.getAdditionalEquipmentList()) {
            AdditionalService existingService = additionalServiceRepository
                    .getByBookingServiceIdAndName(ship.getId(), a.getName());

            if (existingService == null) {
                added.setPrice(a.getPrice());
                added.setName(a.getName());
                added.setBookingService(ship);
                additionalServiceRepository.save(added);
            }
            else {
                return null;
            }
        }

        return ship;
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void updateExistingEstate(ShipDTO dto, Ship existingShip) {
        create(existingShip, dto, existingShip.getOwner());
        shipRepository.save(existingShip);
    }

    private Ship create(Ship ship, ShipDTO dto, User owner) {
        Address address = new Address(
                dto.getStreet(), dto.getNumber(), dto.getCity(), dto.getCountry(),
                dto.getPostcode(), dto.getLongitude(), dto.getLatitude()
        );

        if (estateService.addressAlreadyExists(address) == null) {
            Address updated = addressRepository.save(address);
            ship.setAddress(updated);
        }
        else
            ship.setAddress(estateService.addressAlreadyExists(address));

        ship.setName(dto.getName());
        ship.setType(ServiceType.SHIP);
        ship.setPricePerDay(dto.getPricePerDay());
        ship.setDescription(dto.getDescription());
        ship.setTermsOfUse(dto.getTermsOfUse());
        ship.setCapacity(dto.getCapacity());
        ship.setPercentageTakenFromCanceledReservations(dto.getIsPercentageTakenFromCanceledReservations());
        ship.setPercentageToTake(dto.getPercentageToTake());
        ship.setOwner(owner);
        ship.setLength(dto.getLength());
        ship.setShipType(dto.getShipType());
        ship.setMaxSpeed(dto.getMaxSpeed());
        ship.setNumOfEngines(dto.getNumOfEngines());
        ship.setPowerOfEngines(dto.getPowerOfEngines());
        ship.setShipType(dto.getShipType());
        return ship;
    }

    public boolean hasAnyReservations(BookingService service) {
        List<Reservation> reservations = new ArrayList<>();

        for ( Reservation r : reservationRepository.findAll()){
            if (r.getBookingService().getId().equals(service.getId()) && (r.getReservationEnd().compareTo(new Date())) >= 0)
                reservations.add(r);
        }

        return reservations.isEmpty();
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED,
            propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void deleteEstate(Ship ship) {
        shipRepository.deleteById(ship.getId());
    }

    public List<Ship> getAll(){
        return shipRepository.findAll();
    }

    public void addNavigationTools(NavigationToolDTO dto, Ship existing) {
        ShipNavigationTool tool = toolRepository
                .getByNameAndShipId(dto.getName(), existing.getId());

        if (tool == null) {
            ShipNavigationTool added = new ShipNavigationTool();
            added.setName(dto.getName());
            added.setDescription(dto.getDescription());
            added.setShip(existing);
            toolRepository.save(added);
        }
    }

    public void updateTools(NavigationToolDTO dto, Ship existing) {
        ShipNavigationTool tool = toolRepository
                .getByNameAndShipId(dto.getName(), existing.getId());

        tool.setDescription(dto.getDescription());
        toolRepository.save(tool);
    }

    public void deleteTools(NavigationToolDTO dto, Ship existing) {
        ShipNavigationTool tool = toolRepository
                .getByNameAndShipId(dto.getName(), existing.getId());

        toolRepository.deleteById(tool.getId());
    }

    public List<Ship> searchByName(String input){
        List<Ship> foundShips = new ArrayList<>();
        List<Ship> allShips =  shipRepository.findAll();
        for (Ship ship : allShips) {
            if(ship.getName().toLowerCase().contains(input.toLowerCase()))
                foundShips.add(ship);
        }
        return foundShips;
    }

    public List<Ship> searchByCity(String input){
        List<Ship> foundShips = new ArrayList<>();
        List<Ship> allShips =  shipRepository.findAll();
        for (Ship ship : allShips) {
            if(ship.getAddress().getCity().toLowerCase().contains(input.toLowerCase()))
                foundShips.add(ship);
        }
        return foundShips;
    }

    public List<Ship> searchByCapacity(int requestedCapacity){
        List<Ship> foundShips = new ArrayList<>();
        List<Ship> allShips =  shipRepository.findAll();
        for (Ship ship : allShips) {
            if(ship.getCapacity() <= requestedCapacity)
                foundShips.add(ship);
        }
        return foundShips;
    }


}
