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
    public List<Category> findCategoriesOfUser(User user) {
        List<Category> categories = new ArrayList<>();
        String query = "SELECT * FROM categoria c, persona_categoria pc WHERE c.id = pc.id_categoria AND pc.id_persona = ?";

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, user.getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                categories.add(mapCategory(rs));
            }
            return categories;

        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't find categories", e);
        }
    }

    @Override
    public List<Category> findCategoriesOfEvent(Event event) {
        List<Category> categories = new ArrayList<>();
        String query = "SELECT * FROM categoria c, evento_categoria ec WHERE c.id = ec.id_categoria AND ec.id_evento = ?";

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, event.getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                categories.add(mapCategory(rs));
            }
            return categories;

        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't find categories", e);
        }
    }


    private Category mapCategory(ResultSet rs) throws SQLException {
        Category category = new Category();
        category.setId(rs.getInt("id"));
        category.setNome(rs.getString("nome"));
        category.setDescrizione(rs.getString("descrizione"));
        return category;
    }

}
