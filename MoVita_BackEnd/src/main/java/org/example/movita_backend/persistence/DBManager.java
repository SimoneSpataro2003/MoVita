package org.example.movita_backend.persistence;

import org.example.movita_backend.persistence.dao.*;
import org.example.movita_backend.persistence.impl.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBManager {
    private static DBManager instance;

    private  DBManager() {}

    public static DBManager getInstance() {
        if (instance == null){
            instance = new DBManager();
        }
        return instance;
    }

    private UserDaoJDBC userDao;
    private PaymentDaoJDBC paymentDao;
    private EventDaoJDBC eventDao;
    private BookingDaoJDBC bookingDao;
    private CategoryDaoJDBC categoryDao;

    Connection connection = null;

    public Connection getConnection() {
        if (connection == null){
            try {
                connection = DriverManager.getConnection(
                        "jdbc:postgresql://localhost:5432/movita", "postgres", "postgres");
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return connection;
    }

    public UserDao getUserDAO() {
        if(userDao == null){
            userDao = new UserDaoJDBC();
        }
        return userDao;
    }

    public EventDao getEventDAO(){
        if(eventDao == null){
            eventDao = new EventDaoJDBC();
        }
        return eventDao;
    }

    public CategoryDao getCategoryDAO(){
        if(categoryDao == null){
            categoryDao = new CategoryDaoJDBC();
        }
        return categoryDao;
    }
    public BookingDao getBookingDAO(){
        if(bookingDao == null){
            bookingDao = new BookingDaoJDBC();
        }
        return bookingDao;
    }

    public PaymentDAO getPaymentDAO() {
        if (paymentDao == null)
        {
            paymentDao = new PaymentDaoJDBC();
        }
        return paymentDao;
    }
}
