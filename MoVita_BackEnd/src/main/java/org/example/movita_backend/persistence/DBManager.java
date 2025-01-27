package org.example.movita_backend.persistence;

import org.example.movita_backend.persistence.dao.EventDao;
import org.example.movita_backend.persistence.dao.PaymentDAO;
import org.example.movita_backend.persistence.dao.UserDao;
import org.example.movita_backend.persistence.impl.EventDaoJDBC;
import org.example.movita_backend.persistence.impl.PaymentDaoJDBC;
import org.example.movita_backend.persistence.impl.UserDaoJDBC;

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

    public PaymentDAO getPaymentDAO() {
        if (paymentDao == null)
        {
            paymentDao = new PaymentDaoJDBC();
        }
        return paymentDao;
    }
}
