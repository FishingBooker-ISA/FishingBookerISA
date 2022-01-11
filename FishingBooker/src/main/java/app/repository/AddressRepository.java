package app.repository;

import app.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository  extends JpaRepository<Address, Integer> {
    Address getByCityAndCountryAndStreetAndNumberAndPostcode(String city, String country, String Street, int number, int postcode);
}
