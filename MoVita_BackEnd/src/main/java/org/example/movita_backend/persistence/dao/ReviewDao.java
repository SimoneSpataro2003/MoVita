package org.example.movita_backend.persistence.dao;

import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.Review;
import org.example.movita_backend.model.User;
import org.example.movita_backend.model.dto.ReviewEvent;

import java.util.List;


public interface ReviewDao {

    List<Review> findAll();
    Review findById(User user, Event event);
    List<Review> findByEvent(Event event);
    Review update(Review booking);
    void save(ReviewEvent booking);

}
