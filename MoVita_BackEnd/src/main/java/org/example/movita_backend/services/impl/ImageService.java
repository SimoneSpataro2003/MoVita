package org.example.movita_backend.services.impl;



import org.example.movita_backend.services.interfaces.IImageService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Collection;

@Service
public class ImageService implements IImageService {


    private final ResourceLoader resourceLoader;


    public ImageService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;    }


    @Override
    public Resource getUserImage(int userId) throws IOException {
        String imagePath = userImagesPath+userId+".jpg";
        Resource resource = resourceLoader.getResource("classpath:"+imagePath);
        if(Files.exists(Path.of(resource.getURI())))
            return resource;
        else
            throw new IOException();
    }

    @Override
    public Resource getEventImage(int eventId, String imageName) throws IOException {
        Resource resource = resourceLoader.getResource("classpath:"+eventImagesPath+eventId+"/"+imageName);
        if(Files.exists(Path.of(resource.getURI())))
            return resource;
        else
            throw new IOException();
    }

    @Override
    public Collection<String> getEventImagesNames(int eventId) throws IOException {
        String imagePath = eventImagesPath + eventId ;
        Resource resource = resourceLoader.getResource("classpath:"+imagePath);
        Collection<String> immagini = new ArrayList<>();

        File directory = new File(resource.getURI());

        if (directory.exists() && directory.isDirectory()) {
            File[] files = directory.listFiles();

            if (files != null) {
                for (File file : files) {
                    immagini.add(file.getName());
                }
            }
            return immagini;
        } else {
            throw new IOException("La cartella dell'evento non esiste o è vuota");
        }
    }

    @Override
    public void addUserImage(int userId, MultipartFile image) throws IOException {

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

}
