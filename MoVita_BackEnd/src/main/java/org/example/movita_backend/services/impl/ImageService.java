package org.example.movita_backend.services.impl;



import org.example.movita_backend.services.interfaces.IImageService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ImageService implements IImageService {


    private final ResourceLoader resourceLoader;


    public ImageService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;    }


    @Override
    public Resource getUserImage(int userId) throws IOException {
        Path filePath = Paths.get(userImagesPath, userId + ".jpg");
        if (!Files.exists(filePath)) {
            throw new FileNotFoundException("User image not found for user ID: " + userId);
        }
        return new UrlResource(filePath.toUri());
    }

    @Override
    public Resource getEventImage(int eventId, String imageName) throws IOException {
        Path filePath = Paths.get(eventImagesPath, eventId + "/" + imageName );
        if (!Files.exists(filePath)) {
            throw new FileNotFoundException("Event image not found for event ID: " + eventId + ", Image name: " + imageName);
        }
        return new UrlResource(filePath.toUri());
    }

    @Override
    public Collection<String> getEventImagesNames(int eventId) throws IOException {
        Path eventDir = Paths.get(eventImagesPath, String.valueOf(eventId));
        if (!Files.exists(eventDir) || !Files.isDirectory(eventDir)) {
            throw new FileNotFoundException("Event directory not found for event ID: " + eventId);
        }
        Collection<String> imageNames = new HashSet<>();
        File folder = eventDir.toFile();
        File[] files = folder.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isFile()) {
                    imageNames.add(file.getName());
                }
            }
        }
        return imageNames;
    }

    @Override
    public void addEventImage(int eventId, MultipartFile image) throws IOException {
        Path eventDir = Paths.get(eventImagesPath + eventId);
        if (!Files.exists(eventDir)) {
            Files.createDirectories(eventDir);
        }
        Path filePath = eventDir.resolve(image.getOriginalFilename());
        System.out.println(filePath.toAbsolutePath());
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    }

    @Override
    public void addUserImage(int userId, MultipartFile image) throws IOException {
        Path userDir = Paths.get(userImagesPath);
        if (!Files.exists(userDir)) {
            Files.createDirectories(userDir);
        }
        Path filePath = userDir.resolve(userId + ".jpg");
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    }


}
