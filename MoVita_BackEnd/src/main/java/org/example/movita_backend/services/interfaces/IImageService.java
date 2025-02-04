package org.example.movita_backend.services.interfaces;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collection;

public interface IImageService {

    String userImagesPath = "images/user/";
    String eventImagesPath = "images/event/";
    Resource getUserImage(int userId)  throws IOException;
    Resource getEventImage(int eventId, String imageName) throws IOException;
    Collection<String> getEventImagesNames(int eventId)  throws IOException;
    void addUserImage(int userId, MultipartFile image) throws IOException;
    void addEventImage(int eventId, MultipartFile image) throws IOException;
}
