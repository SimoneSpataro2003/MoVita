package org.example.movita_backend.controller;

import lombok.Getter;
import org.apache.coyote.Response;
import org.example.movita_backend.exception.event.EventNotValid;
import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.Review;
import org.example.movita_backend.services.impl.UserService;
import org.example.movita_backend.services.interfaces.IBookingService;
import org.example.movita_backend.services.interfaces.IEventService;
import org.example.movita_backend.services.interfaces.IReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.Collection;
import java.util.List;

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

    // Memo Giuseppe da provare

    @GetMapping("/get-all-events")
    ResponseEntity<Collection<Event>> getAllEvents(){
        Collection<Event> allEvents = this.eventService.findAll();
        return ResponseEntity.ok(allEvents);
    }

    @GetMapping("/get-event-by-id/eventId")
    ResponseEntity<Event> getEventById(@PathVariable int eventId){
        Event event = eventService.findById(eventId);
        return ResponseEntity.ok(event);
    }

    @GetMapping("/get-event-by-filter/filter")
    ResponseEntity<Collection<Event>> getEventByFilter(@PathVariable String filter){
        Collection<Event> events = eventService.findByFilter(filter);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/get-event-by-user/user")
    ResponseEntity<Collection<Booking>> getEventByUser(@PathVariable int user){
        Collection<Booking> events = bookingService.findByUser(user);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/get-categories/{eventId}")
    ResponseEntity<Collection<Category>> getCategories(@PathVariable int eventId){
        Collection<Category> categories = eventService.findCategories(eventId);
        return ResponseEntity.ok(categories);
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
    ResponseEntity<Booking> postBookEvent(@RequestBody Booking booking) throws Exception
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
