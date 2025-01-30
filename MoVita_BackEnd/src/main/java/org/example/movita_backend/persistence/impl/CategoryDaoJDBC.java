package org.example.movita_backend.persistence.impl;

import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.ResultSetMapper;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.CategoryDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import static org.example.movita_backend.model.ResultSetMapper.*;

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
                categories.add(mapCategory(rs));
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
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                category = mapCategory(rs);
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
        String query = "SELECT * FROM categoria WHERE nome LIKE ?";

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, "%" + nomeCategoria + "%");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                categories.add(mapCategory(rs));
            }
            return categories;

        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't find that category", e);
        }
    }

    @Override
    public List<User> findUsers(Category category) {
        List<User> interestedUsers = new ArrayList<>();
        String query = "SELECT u.* FROM utente u, persona_categoria pc WHERE u.id = pc.id_persona AND pc.id_categoria = ?";

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, category.getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                interestedUsers.add(mapUser(rs));
            }
            return interestedUsers;

        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't find categories", e);
        }
    }

    @Override
    public List<Event> findEvents(Category category) {
        List<Event> events = new ArrayList<>();
        String query = "SELECT e.* FROM evento e, evento_categoria ec WHERE e.id = ec.id_evento AND ec.id_categoria = ?";

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, category.getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                events.add(mapEvent(rs));
            }
            return events;

        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't find categories", e);
        }
    }
}
