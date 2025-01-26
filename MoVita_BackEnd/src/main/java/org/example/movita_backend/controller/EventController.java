package org.example.movita_backend.controller;

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

    public EventController(IEventService eventService) {
        this.eventService = eventService;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    ResponseEntity<Collection<Event>> getAllEvents(){
        Collection<Event> allEvents = this.eventService.findAll();
        return ResponseEntity.ok(allEvents);
    }

    @RequestMapping(value = "/{eventId}", method = RequestMethod.GET)
    ResponseEntity<Event> getEventById(@PathVariable int eventId){
        Event event = eventService.findById(eventId);
        return ResponseEntity.ok(event);
    }

    @RequestMapping(value = "/{filter}", method = RequestMethod.GET)
    ResponseEntity<Collection<Event>> getEventById(@PathVariable String filter){
        Collection<Event> events = eventService.findByFilter(filter);
        return ResponseEntity.ok(events);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    ResponseEntity<Event> postCreateNewEvent(@RequestBody  Event event) throws Exception {

        try{
            return  ResponseEntity.ok(
                    this.eventService.createEvent(event)
            );
        }catch (EventNotValid e){
            return new ResponseEntity(e.getMessage() , HttpStatusCode.valueOf(400));
        }

    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    ResponseEntity<Event> postUpdateEvent(@RequestBody Event event) throws Exception
    {
        return  ResponseEntity.ok(
                this.eventService.updateEvent(event)
        );
    }

    @RequestMapping(value = "/{idEvent}", method = RequestMethod.DELETE)
    ResponseEntity<Void> deleteEvent(@PathVariable int idEvent)
    {
        this.eventService.deleteEvent(idEvent);
        return ResponseEntity.ok().build();
    }


}
