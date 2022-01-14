package app.service;

import app.domain.BookingService;
import app.domain.Image;
import app.dto.ImageDTO;
import app.repository.ImageRepository;
import app.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
public class ManipulatingImagesService {
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    ServiceRepository serviceRepository;

    public void addImage(ImageDTO imageDTO) {
        Image image = new Image();
        BookingService bookingService = serviceRepository.getById(imageDTO.getServiceId());

        image.setService(bookingService);
        byte[] bytes = Base64.getDecoder().decode(imageDTO.getBase64());
        image.setBytes(bytes);
        imageRepository.save(image);
    }

    public List<Image> getImagesByService(int serviceId) {
        return imageRepository.getImagesByBookingServiceId(serviceId);
    }
}

















