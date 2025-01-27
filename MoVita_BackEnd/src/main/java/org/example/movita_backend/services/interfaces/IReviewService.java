package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Review;

import java.util.List;

public interface IReviewService {

    List<Review> findAll();
    Review findById(int id_utente, int id_evento);
    Review createReview(Review review) throws Exception;
    Review updateReview(Review review) throws Exception;


}
