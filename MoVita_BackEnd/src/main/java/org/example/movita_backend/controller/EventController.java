package org.example.movita_backend.controller;

import lombok.Getter;
import org.apache.coyote.Response;
import org.example.movita_backend.exception.event.EventNotValid;
import org.example.movita_backend.model.*;
import org.example.movita_backend.model.dto.BookingEvent;
import org.example.movita_backend.model.dto.EventFilter;
import org.example.movita_backend.model.dto.ReviewEvent;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.services.impl.UserService;
import org.example.movita_backend.services.interfaces.IBookingService;
import org.example.movita_backend.services.interfaces.IEventService;
import org.example.movita_backend.services.interfaces.IImageService;
import org.example.movita_backend.services.interfaces.IReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.print.Book;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/event")
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {

    @Autowired
    IEventService eventService;

    @Autowired
    IBookingService bookingService;

    @Autowired
    IReviewService reviewService;

    @Autowired
    IImageService imageService;

    // Memo Giuseppe da provare

    @GetMapping("/get-all-events")
    ResponseEntity<Collection<Event>> getAllEvents(){
        Collection<Event> allEvents = this.eventService.findAll();
        return ResponseEntity.ok(allEvents);
    }

    @GetMapping("/get-event-by-id/{eventId}")
    ResponseEntity<Event> getEventById(@PathVariable int eventId){
        Event event = eventService.findById(eventId);
        return ResponseEntity.ok(event);
    }

    @GetMapping("/get-event-description/{eventId}")
    ResponseEntity<?> getEventDescription(@PathVariable int eventId){
        String descrizione = eventService.findDescrizione(eventId);
        return ResponseEntity.ok(Map.of("descrizione",descrizione));
    }

    @PostMapping("/get-event-by-filter")
    ResponseEntity<Collection<Event>> getEventByFilter(@RequestBody EventFilter eventFilter){
        Collection<Event> events = eventService.findByFilter(eventFilter);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/get-image-names-event/{eventId}")
    public ResponseEntity<Collection<String>> getEventImagesNames(@PathVariable int eventId) {
        try {
            Collection<String> images = imageService.getEventImagesNames(eventId);

            if (images.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok(images);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
//    @GetMapping("/get-image-event/{eventId}/{imageName}")
//    public ResponseEntity<?> getEventImage(@PathVariable int eventId, @PathVariable String imageName){
//        try
//        {
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + imageName)
//                    .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
//                    .body(imageService.getEventImage(eventId,imageName));
//        }
//        catch (Exception e)
//        {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The user image doesn't exist");
//        }
//
//    }


//    @Value("${upload.path}")
//    private String uploadPath;
//
//    @PostMapping("/set-event-image")
//    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
//
//          //  String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
//            Path path = Paths.get("./");
//            System.out.println(path);
//            return ResponseEntity.ok("Image uploaded successfully");
//
//    }

    @PostMapping("/set-event-image/{eventId}")
    public ResponseEntity<String> setEventImage(@RequestBody MultipartFile image,
                                              @PathVariable int eventId) {
        try {
            imageService.addEventImage(eventId, image);
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }

    @GetMapping("/get-image-event/{eventId}/{imageName}")
    public ResponseEntity<?> getEventImage(@PathVariable int eventId, @PathVariable String imageName) {
        try {
            Resource image = imageService.getEventImage(eventId, imageName);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + imageName + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
                    .body(image);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The event image doesn't exist");
        }
    }

    @GetMapping("/get-booking-by-user/{user}")
    ResponseEntity<Collection<Booking>> getBookingByUser(@PathVariable int user){
        Collection<Booking> bookings = bookingService.findByUser(user);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/get-booking/{userId}")
    ResponseEntity<List<Booking>> getBookingById(@PathVariable int userId){
        try
        {
            List<Booking> partecipations = bookingService.findBookingById(userId);
            return ResponseEntity.ok(partecipations);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
    }

    @GetMapping("/get-booking-by-event/{event}")
    ResponseEntity<Collection<Booking>> getBookingByEvent(@PathVariable int event){
        Collection<Booking> bookings = bookingService.findByEvent(event);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/get-categories/{eventId}")
    ResponseEntity<Collection<Category>> getCategories(@PathVariable int eventId){
        Collection<Category> categories = eventService.findCategories(eventId);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/get-event-review/{eventId}")
    ResponseEntity<Collection<Review>> getEventReview(@PathVariable int eventId){
        Collection<Review> reviews = reviewService.findByEvent(eventId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/create-event-review")
    ResponseEntity<Review> createEventReview(@RequestBody ReviewEvent review){
        return  ResponseEntity.ok(
                this.reviewService.createReview(review));
    }

    @PostMapping("/create-event")
    ResponseEntity<Event> postCreateNewEvent(@RequestBody Event event) throws Exception {
        try{
            return  ResponseEntity.ok(
                    this.eventService.createEvent(event)
            );
        }catch (EventNotValid e){
            return new ResponseEntity(e.getMessage() , HttpStatusCode.valueOf(400));
        }

    }

    @PutMapping("/update-event")
    ResponseEntity<Event> postUpdateEvent(@RequestBody Event event) throws Exception
    {
        return  ResponseEntity.ok(
                this.eventService.updateEvent(event)
        );
    }

    @PostMapping("/book-event")
    ResponseEntity<Booking> postBookEvent(@RequestBody BookingEvent booking) throws Exception
    {
        return  ResponseEntity.ok(
                this.bookingService.createBooking(booking)
        );
    }

    @DeleteMapping("/delete-event")
    ResponseEntity<Void> deleteEvent(@RequestBody int idEvent)
    {
        this.eventService.deleteEvent(idEvent);
        return ResponseEntity.ok().build();
    }


}
