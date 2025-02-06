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
    public void insertUserCategories(User user, List<Category> categories) {
        /*
         * due query:
         * 1. elimino tutte le tuple precedentemente inserite per quell'utente
         * 2. inserisco le nuove tuple.
         * PERCHE'NON USO UN TRIGGER CHE ELIMINA LE TUPLE?
         *      - L'utilizzo di un trigger before insert fa sì che venga scaturito ogni volta che
         *        effettuo una insert. Ma essendo una insert multipla, inserirei sempre e solo
         *        l'ultimo elemento della lista!
         * Questa soluzione è più semplice in quanto previene eventuali controlli e modifiche/eliminazioni.
         * */
        //USO LE TRANSAZIONI, per garantire atomicità e consistenza:
        String deleteQuery = "DELETE FROM persona_categoria WHERE id_persona = ?";
        String insertQuery = "INSERT INTO persona_categoria VALUES (?,?)";

        try {
            //disabilito il commit automatico
            connection.setAutoCommit(false);

            try {
                //1. elimino tutte le tuple
                PreparedStatement psDelete = connection.prepareStatement(deleteQuery);
                psDelete.setInt(1, user.getId());
                psDelete.executeUpdate();

                //2. inserisco quelle nuove
                PreparedStatement psInsert = connection.prepareStatement(insertQuery);
                psInsert.setInt(1, user.getId());

                for (Category category : categories) {
                    psInsert.setInt(2, category.getId());
                    //batch raggruppa operazioni tra di loro, passandole al DB come se fosse una sola.
                    psInsert.addBatch();
                }

                psInsert.executeBatch();
                connection.commit();
            } catch (SQLException e) {
                connection.rollback(); // Ripristina lo stato iniziale in caso di errore
                e.printStackTrace();
                throw new RuntimeException("Couldn't insert interested categories of user.", e);
            } finally {
                connection.setAutoCommit(true); // Ripristina sempre l'auto-commit
            }
        } catch (SQLException e) {
            throw new RuntimeException("Database error while handling transaction.", e);
        }
    }

    @Override
    public void insertEventCategories(Event event, List<Category> categories) {
        /*
         * Due query, come per user (vedi sopra per chiarimenti):
         * */

        //USO LE TRANSAZIONI:
        String deleteQuery = "DELETE FROM evento_categoria WHERE id_evento = ?";
        String insertQuery = "INSERT INTO evento_categoria VALUES (?,?)";

        try {
            //disabilito il commit automatico
            connection.setAutoCommit(false);

            try {
                //1. elimino tutte le tuple
                PreparedStatement psDelete = connection.prepareStatement(deleteQuery);
                psDelete.setInt(1, event.getId());
                psDelete.executeUpdate();

                //2. inserisco quelle nuove
                PreparedStatement psInsert = connection.prepareStatement(insertQuery);
                psInsert.setInt(1, event.getId());

                for (Category category : categories) {
                    psInsert.setInt(2, category.getId());
                    //batch raggruppa operazioni tra di loro, passandole al DB come se fosse una sola.
                    psInsert.addBatch();
                }

                psInsert.executeBatch();
                connection.commit();
            } catch (SQLException e) {
                connection.rollback(); // Ripristina lo stato iniziale in caso di errore
                e.printStackTrace();
                throw new RuntimeException("Couldn't insert categories of event.", e);
            } finally {
                connection.setAutoCommit(true); // Ripristina sempre l'auto-commit
            }
        } catch (SQLException e) {
            throw new RuntimeException("Database error while handling transaction.", e);
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

    @Override
    public void insertCategoryToEvent(int eventId, String categoryName) {
        // La query per ottenere l'ID della categoria in base al nome
        String selectQuery = "SELECT id FROM categoria WHERE id = ?";

        // La query per inserire la categoria nell'evento
        String insertQuery = "INSERT INTO evento_categoria (id_evento, id_categoria) VALUES (?, ?)";

        try {
            // Disabilito il commit automatico per gestire manualmente la transazione
            connection.setAutoCommit(false);

            try {
                // Prepara la query per ottenere l'ID della categoria
                PreparedStatement psSelect = connection.prepareStatement(selectQuery);
                psSelect.setString(1, categoryName);
                ResultSet rs = psSelect.executeQuery();

                if (rs.next()) {
                    int categoryId = rs.getInt("id");  // Ottieni l'ID della categoria

                    // Prepara la query per inserire la categoria nell'evento
                    PreparedStatement psInsert = connection.prepareStatement(insertQuery);
                    psInsert.setInt(1, eventId);
                    psInsert.setInt(2, categoryId);
                    psInsert.executeUpdate(); // Inserisci la categoria

                    connection.commit(); // Conferma la transazione
                } else {
                    // Se la categoria non esiste, puoi gestirlo come preferisci
                    System.out.println("Categoria non trovata: " + categoryName);
                }
            } catch (SQLException e) {
                connection.rollback(); // Ripristina lo stato iniziale in caso di errore
                e.printStackTrace();
                throw new RuntimeException("Couldn't insert category for event.", e);
            } finally {
                connection.setAutoCommit(true); // Ripristina l'auto-commit dopo l'operazione
            }
        } catch (SQLException e) {
            throw new RuntimeException("Database error while handling transaction.", e);
        }
    }

}
