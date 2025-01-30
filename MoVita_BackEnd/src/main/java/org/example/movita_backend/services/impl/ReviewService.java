package org.example.movita_backend.services.impl;

import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Review;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.BookingDao;
import org.example.movita_backend.persistence.dao.ReviewDao;
import org.example.movita_backend.services.interfaces.IReviewService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
class ReviewService implements IReviewService {

    // Memo Giuseppe da provare
    private final ReviewDao reviewDao;

    ReviewService(ReviewDao reviewDao){this.reviewDao = reviewDao;}

    @Override
    public List<Review> findAll() {
        return reviewDao.findAll();
    }

    @Override
    public Review findById(int id_utente, int id_evento) {
        return reviewDao.findById(DBManager.getInstance().getUserDAO().findById(id_utente),DBManager.getInstance().getEventDAO().findById(id_evento));
    }

    @Override
    public List<Review>  findByEvent(int id_evento){
        return reviewDao.findByEvent(DBManager.getInstance().getEventDAO().findById(id_evento));
    }

    @Override
    public Review createReview(Review review) throws Exception {
        reviewDao.save(review);
        return reviewDao.findById(review.getUtente(), review.getEvento());
    }

    @Override
    public Review updateReview(Review review) throws Exception {
        reviewDao.save(review);
        return reviewDao.findById(review.getUtente(), review.getEvento());
    }
}
