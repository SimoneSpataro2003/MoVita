package org.example.movita_backend.controller;

import lombok.Getter;
import org.apache.coyote.Response;
import org.example.movita_backend.exception.event.EventNotValid;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.services.impl.UserService;
import org.example.movita_backend.services.interfaces.IEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/event")
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {

    @Autowired
    IEventService eventService;

    // Memo Giuseppe da provare

    @GetMapping("/get-all-events")
    ResponseEntity<Collection<Event>> getAllEvents(){
        Collection<Event> allEvents = this.eventService.findAll();
        return ResponseEntity.ok(allEvents);
    }

    @GetMapping("/get-event-by-id")
    ResponseEntity<Event> getEventById(@RequestParam(name = "eventId") int eventId){
        Event event = eventService.findById(eventId);
        return ResponseEntity.ok(event);
    }

    @GetMapping("/get-event-by-filter")
    ResponseEntity<Collection<Event>> getEventByFilter(@RequestParam(name = "filter")  String filter){
        Collection<Event> events = eventService.findByFilter(filter);
        return ResponseEntity.ok(events);
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

    @DeleteMapping("/delete-event")
    ResponseEntity<Void> deleteEvent(@RequestBody int idEvent)
    {
        this.eventService.deleteEvent(idEvent);
        return ResponseEntity.ok().build();
    }


}
