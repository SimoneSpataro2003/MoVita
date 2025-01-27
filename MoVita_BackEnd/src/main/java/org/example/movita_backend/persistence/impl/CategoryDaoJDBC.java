package org.example.movita_backend.persistence.impl;

import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.CategoryDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CategoryDaoJDBC implements CategoryDao {
    private final Connection connection;
    public CategoryDaoJDBC() { this.connection = DBManager.getInstance().getConnection(); }

    @Override
    public List<Category> findAll() {
        List<Category> categories = new ArrayList<>();
        String query = "SELECT * FROM categoria";

        try (PreparedStatement stmt = connection.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                categories.add(convertResultSetToCategory(rs));
            }

        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't find categories", e);
        }

        return categories;
    }

    @Override
    public Category findById(int idCategoria) {
        Category category = null;
        String query = "SELECT * FROM categoria WHERE id = ?";

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, idCategoria);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    category = convertResultSetToCategory(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't find that category", e);
        }

        return category;
    }

    @Override
    public List<Category> findByName(String nomeCategoria) {
        List<Category> categories = new ArrayList<>();
        String query = "SELECT * FROM categoria WHERE nome = ?";

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, "%" + nomeCategoria + "%");
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    categories.add(convertResultSetToCategory(rs));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't find that category", e);
        }

        return categories;
    }

    private Category convertResultSetToCategory(ResultSet rs) throws SQLException {
        Category category = new Category();
        category.setId(rs.getInt("id"));
        category.setNome(rs.getString("nome"));
        category.setDescrizione(rs.getString("descrizione"));
        return category;
    }

    @Override
    public User findInterestedUser(int id) {
        return null;
    }

    @Override
    public List<Event> findEvents(int id) {
        return List.of();
    }
}
