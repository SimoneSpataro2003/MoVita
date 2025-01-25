package org.example.movita_backend.controller;

import org.example.movita_backend.model.Event;
import org.example.movita_backend.services.impl.UserService;
import org.example.movita_backend.services.interfaces.IEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/event")
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {

    @Autowired
    IEventService eventService;

    public EventController(IEventService eventService) {
        this.eventService = eventService;
    }


}
