package app.controller;

import app.domain.BookingService;
import app.domain.Image;
import app.domain.User;
import app.dto.ImageDTO;
import app.repository.ImageRepository;
import app.repository.ServiceRepository;
import app.service.ManipulatingImagesService;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "api/images")
public class ImageController {
    @Autowired
    private ManipulatingImagesService imagesService;
    @Autowired
    private UserService userService;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private ImageRepository imageRepository;

    @PostMapping(value = "/addImages", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + " || hasAuthority('ROLE_SHIP_OWNER')" + " || hasAuthority('ROLE_INSTRUCTOR')")
    public ResponseEntity<String> addImagesToService(@Valid  @RequestBody ImageDTO imageDto, Principal user) {
        User currentUser = this.userService.findByEmail(user.getName());
        BookingService existingService = serviceRepository.getById(imageDto.getServiceId());

        if (!existingService.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>("Unauthorized operation!", HttpStatus.UNAUTHORIZED);
        }

        try {
            imagesService.addImage(imageDto);
            return new ResponseEntity<>("Added image!", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/getImages", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Image>> getImagesForService(int serviceId, Principal user) {
        User currentUser = this.userService.findByEmail(user.getName());
        BookingService existingService = serviceRepository.getById(serviceId);

        if (!existingService.getOwner().getId().equals(currentUser.getId())){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(imagesService.getImagesByService(serviceId), HttpStatus.OK);
    }

    @PostMapping(value = "/deleteImages", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ESTATE_OWNER')" + " || hasAuthority('ROLE_SHIP_OWNER')" + " || hasAuthority('ROLE_INSTRUCTOR')")
    public void deleteSelectedImages(@RequestBody List<Integer> ids) {
        List<Image> images = imageRepository.findAllById(ids);
        imageRepository.deleteAll(images);
    }
}
