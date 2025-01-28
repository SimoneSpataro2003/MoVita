package org.example.movita_backend.services.impl;

import org.example.movita_backend.model.Payment;
import org.example.movita_backend.persistence.dao.PaymentDAO;
import org.example.movita_backend.persistence.dao.UserDao;
import org.example.movita_backend.persistence.proxy.UserProxy;
import org.example.movita_backend.services.interfaces.IPaymentService;
import org.example.movita_backend.services.interfaces.IUserService; // Aggiunto IUserService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService implements IPaymentService {

    private final PaymentDAO paymentDao;
    private final UserProxy userProxy;

    @Autowired
    public PaymentService(PaymentDAO paymentDao, UserDao userDao) {
        this.paymentDao = paymentDao;
        this.userProxy = new UserProxy();
    }

    @Override
    public void createCheckoutSession(Payment payment) {
        paymentDao.addPayment(payment);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentDao.getAllPayments();
    }

    @Override
    public List<Payment> getPayments() {
        return userProxy.getPayments();
    }
}
