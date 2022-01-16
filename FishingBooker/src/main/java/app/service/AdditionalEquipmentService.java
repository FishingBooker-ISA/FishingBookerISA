package app.service;

import app.domain.AdditionalService;
import app.domain.BookingService;
import app.dto.AdditionalEquipmentDTO;
import app.repository.AdditionalServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdditionalEquipmentService {
    @Autowired
    AdditionalServiceRepository additionalServiceRepository;

    public void updateAddedServices(AdditionalEquipmentDTO dto, BookingService existing) {
        AdditionalService existingService = additionalServiceRepository
                .getByBookingServiceIdAndName(existing.getId(), dto.getName());

        existingService.setPrice(dto.getPrice());
        additionalServiceRepository.save(existingService);
    }

    public void deleteAddedServices(AdditionalEquipmentDTO dto, BookingService existing) {
        AdditionalService existingService = additionalServiceRepository
                .getByBookingServiceIdAndName(existing.getId(), dto.getName());

        additionalServiceRepository.deleteById(existingService.getId());
    }
}
