package org.example.movita_backend.persistence;

import org.example.movita_backend.persistence.dao.PaymentDAO;
import org.example.movita_backend.persistence.dao.UserDAO;
import org.example.movita_backend.persistence.imple.PaymentDAOimpl;
import org.example.movita_backend.persistence.imple.UserDAOimpl;

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

    Connection connection;

    public Connection getConnection() {
        if (connection == null){
            try {
                connection = DriverManager.getConnection(
                        "jdbc:postgresql://localhost:5432/movita_db", "root", "root");
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return connection;
    }

    public UserDAO getUserDAO() {
        return new UserDAOimpl(getConnection());
    }

    public PaymentDAO getPaymentDAO() {
        return new PaymentDAOimpl(getConnection());
    }
}
