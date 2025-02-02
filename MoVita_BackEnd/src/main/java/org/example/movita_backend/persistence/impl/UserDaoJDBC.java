package org.example.movita_backend.persistence.impl;

import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.ResultSetMapper;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.UserDao;
import org.example.movita_backend.model.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class UserDaoJDBC implements UserDao {
    private final Connection connection;

    public UserDaoJDBC() {
        this.connection= DBManager.getInstance().getConnection();
    }

    @Override
    public void createPerson(User user) {
        String query = "INSERT INTO utente " +
                "(username,email,password,nome,citta,azienda,persona_cognome, premium,admin,mostra_consigli_eventi)" +
                "VALUES " +
                "(?,?,?,?,?,?,?,?,?,?)";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPassword());
            ps.setString(4, user.getNome());
            ps.setString(5, user.getCitta());
            ps.setBoolean(6, user.isAzienda());
            ps.setString(7, user.getPersonaCognome());
            ps.setBoolean(8, user.isPremium());
            ps.setBoolean(9, user.isAdmin());
            ps.setBoolean(10, user.isMostraConsigliEventi());

            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't save user.");
        }
    }
    @Override
    public void createAgency(User user) {
        String query = "INSERT INTO utente " +
                "(username, email,password,nome,citta,azienda,azienda_p_iva,azienda_indirizzo,azienda_recapito,premium,admin,mostra_consigli_eventi)" +
                "VALUES " +
                "(?,?,?,?,?,?,?,?,?,?,?)";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPassword());
            ps.setString(4, user.getNome());
            ps.setString(5, user.getCitta());
            ps.setBoolean(6, user.isAzienda());
            ps.setString(7, user.getAziendaPartitaIva());
            ps.setString(8, user.getAziendaIndirizzo());
            ps.setString(9, user.getAziendaRecapito());
            ps.setBoolean(10, user.isPremium());
            ps.setBoolean(11, user.isAdmin());
            ps.setBoolean(12, user.isMostraConsigliEventi());

            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't save user.");
        }
    }

    @Override
    public void createAdmin(User user) {
        String query = "INSERT INTO utente " +
                "(username, email,password,nome,citta,azienda,premium,admin,mostra_consigli_eventi)" +
                "VALUES " +
                "(?,?,?,?,?,?,?,?,?)";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPassword());
            ps.setString(4, user.getNome());
            ps.setString(5, user.getCitta());
            ps.setBoolean(6, user.isAzienda());
            ps.setBoolean(7, user.isPremium());
            ps.setBoolean(8, user.isAdmin());
            ps.setBoolean(9, user.isMostraConsigliEventi());

            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't save user.");
        }
    }

    @Override
    public User findAdmin() {
        String query = "SELECT * FROM utente WHERE admin = true";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ResultSet rs = ps.executeQuery();

            if(rs.next()){
                return mapUser(rs);
            }
            return null;
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Couldn't find user.");
        }
    }

    @Override
    public User findById(int id) {
        String query = "SELECT * FROM utente WHERE id = ?";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            if(rs.next()){
                return mapUser(rs);
            }
            return null;
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Couldn't find user.");
        }
    }

    @Override
    public User findByUsername(String username) {
        String query = "SELECT * FROM utente WHERE username = ?";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();

            if(rs.next()){
                return mapUser(rs);
            }
            return null;
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Couldn't find user.");
        }
    }

    @Override
    public User findByEmail(String email) {
        String query = "SELECT * FROM utente WHERE email = ?";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();

            if(rs.next()){
                return mapUser(rs);
            }
            return null;
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Couldn't find user.");
        }
    }

    @Override
    public List<User> findAll() {
        String query = "SELECT * FROM utente";
        List<User> toRet = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ResultSet rs = ps.executeQuery();

            while(rs.next()){
                User u = mapUser(rs);
                toRet.add(u);
            }
            return toRet;

        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Couldn't find user.");
        }
    }

    @Override
    public List<User> findPremiumUsers() {
        String query = "SELECT * FROM utente WHERE premium = true";
        List<User> toRet = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ResultSet rs = ps.executeQuery();

            while(rs.next()){
                User u = mapUser(rs);
                toRet.add(u);
            }
            return toRet;

        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Couldn't find user.");
        }
    }

    @Override
    public void deleteById(int id) {
        String query = "DELETE FROM utente WHERE id = ?";
        List<User> toRet = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1, id);

            //TODO: distruggi le associazioni!

            ps.executeUpdate();
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Couldn't find user.");
        }
    }

    @Override
    public User updatePerson(User user) {
        String query = "UPDATE utente SET " +
                "nome=?,citta=?,persona_cognome=?,data_ultima_modifica=CURRENT_TIMESTAMP " +
                "WHERE id=?";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setString(1,user.getNome());
            ps.setString(2,user.getCitta());
            ps.setString(3,user.getPersonaCognome());
            ps.setInt(5,user.getId());

            ps.executeUpdate();
        }catch(SQLException e){
            e.printStackTrace();
            throw new UsernameNotFoundException("Could not update user.");
        }

        return findById(user.getId());
    }

    @Override
    public User updateAgency(User user) {
        String query = "UPDATE utente SET " +
                "nome=?,citta=?,azienda_p_iva=?, azienda_indirizzo=?,azienda_recapito=?,data_ultima_modifica=CURRENT_TIMESTAMP " +
                "WHERE id=?";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setString(1,user.getNome());
            ps.setString(2,user.getCitta());
            ps.setString(3,user.getAziendaPartitaIva());
            ps.setString(4,user.getAziendaIndirizzo());
            ps.setString(5, user.getAziendaRecapito());
            ps.setInt(6, user.getId());

            ps.executeUpdate();
        }catch(SQLException e){
            e.printStackTrace();
            throw new UsernameNotFoundException("Could not update user.");
        }

        return findById(user.getId());
    }

    @Override
    public User updatePremiumStatus(int userId) {
        String query = "UPDATE utente SET " +
                "premium = true, premium_data_inizio = CURRENT_TIMESTAMP, premium_data_fine = CURRENT_TIMESTAMP + INTEVAL '1month' " +
                "WHERE id=?";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1,userId);
            ps.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
            throw new UsernameNotFoundException("Could not update user.");
        }
        return findById(userId);
    }

    @Override
    public User updatePassword(int userId, String newPassword) {
        String query = "UPDATE utente SET " +
                "password=?" +
                "WHERE id=?";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setString(1,newPassword);
            ps.setInt(1,userId);
            ps.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
            throw new UsernameNotFoundException("Could not update user.");
        }
        return findById(userId);
    }

    @Override
    public User updateProfileImage(int userId, String imagePath) {
        String query = "UPDATE utente SET " +
                "immagine_profilo=?" +
                "WHERE id=?";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setString(1,imagePath);
            ps.setInt(1,userId);
            ps.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
            throw new UsernameNotFoundException("Could not update user.");
        }
        return findById(userId);
    }

    @Override
    public User updateConsigliEventi(int userId) {
        String query = "UPDATE utente SET " +
                "mostra_consigli_eventi=FALSE" +
                "WHERE id=?";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1,userId);
            ps.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
            throw new UsernameNotFoundException("Could not update user.");
        }
        return findById(userId);
    }

    //FIXED: Realizzato metodo nell'interfaccia apposita.
    @Override
    public List<User> findFriends(int id) {
        String query = """
                SELECT DISTINCT u.*
                FROM utente u
                JOIN amicizia a ON u.id = a.id_utente1 OR u.id = a.id_utente2
                WHERE (a.id_utente1 = ? OR a.id_utente2 = ?)
                  AND u.id != ?
                  AND a.id_utente1 != a.id_utente2;
                
                """;
        List<User> toRet = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query))
        {
            ps.setInt(1,id);
            ps.setInt(2,id);
            ps.setInt(3,id);
            ResultSet rs = ps.executeQuery();

            while(rs.next())
            {
                toRet.add(mapUser(rs));
            }
            return toRet;
        }
        catch (Exception e)
        {
            throw new RuntimeException("Couldn't find users.");
        }
    }

    //FIXED: Realizzato metodo nell'interfaccia apposita.
    @Override
    public List<User> findUserByUsername(String username) {
        String query = "SELECT * " +
                "FROM utente " +
                "WHERE utente.username ILIKE ?";
        List<User> toRet = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query))
        {
            ps.setString(1, "%"+username+"%");
            ResultSet rs = ps.executeQuery();

            while(rs.next())
            {
                User u = mapUser(rs);
                toRet.add(u);
            }
            return toRet;
        }
        catch (Exception e)
        {
            throw new RuntimeException("Couldn't find user.");
        }
    }

    @Override
    public void makeFriendships(int UserId1, int UserId2)
    {
        String checkQuery = "SELECT COUNT(*) FROM amicizia WHERE ((id_utente1 = ? AND id_utente2 = ?) OR (id_utente1 = ? AND id_utente2 = ?)) AND (id_utente2 != id_utente1)";
        String insertQuery = "INSERT INTO amicizia (id_utente1, id_utente2) VALUES (?, ?)";

        try (PreparedStatement psCheck = connection.prepareStatement(checkQuery)) {
            // Controlla se l'amicizia esiste già
            psCheck.setInt(1, UserId1);
            psCheck.setInt(2, UserId2);
            psCheck.setInt(3, UserId2);
            psCheck.setInt(4, UserId1);

            ResultSet rs = psCheck.executeQuery();
            if (rs.next() && rs.getInt(1) == 0) {
                // Se non esiste, inserisci la nuova amicizia
                try (PreparedStatement psInsert = connection.prepareStatement(insertQuery)) {
                    psInsert.setInt(1, UserId1);
                    psInsert.setInt(2, UserId2);
                    psInsert.executeUpdate();
                }
            } else {
                System.out.println("La relazione di amicizia esiste già.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't make friendship.");
        }

    }

    @Override
    public void deleteFriendships(int UserId1, int UserId2) {
        String query = "DELETE FROM amicizia WHERE (id_utente1 = ? AND id_utente2 = ?) OR (id_utente2 = ? AND id_utente1 = ?)";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1, UserId1);
            ps.setInt(2, UserId2);
            ps.setInt(3, UserId1);
            ps.setInt(4, UserId2);

            ps.executeUpdate();
        }catch (Exception e){
            throw new RuntimeException("Couldn't delete friendship user.");
        }
    }

    @Override
    public int countFriends(int userId) {
        String query = """
                SELECT COUNT(*)
                FROM amicizia
                WHERE (id_utente1 = ? OR id_utente2 = ?)
                  AND (id_utente1 != id_utente2);
                """;

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, userId);
            ps.setInt(2, userId);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Couldn't count friendships.");
        }

        return 0;
    }

    public List<Event> getCreatedEventsByUserId(int userId) {
        String query = "SELECT * FROM evento WHERE evento.creatore = ?";
        List<Event> toRet = new ArrayList<>();

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, userId);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    toRet.add(ResultSetMapper.mapEvent(rs));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't get created events.");
        }
        return toRet;
    }

    @Override
    public boolean checkFriendship(int userId1, int userId2) {
        String query = "SELECT * FROM amicizia WHERE (id_utente1 = ? AND id_utente2 = ?) OR (id_utente1 = ? AND id_utente2 = ?)";

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, userId1);
            ps.setInt(2, userId2);
            ps.setInt(3, userId2);
            ps.setInt(4, userId1);

            try (ResultSet rs = ps.executeQuery()) {
                return rs.next();
            }
        } catch (Exception e) {
            // Aggiungi l'eccezione originale per il debug
            throw new RuntimeException("Couldn't check friendship.", e);
        }
    }


    private User mapUser(ResultSet rs) throws SQLException {
        User u = new User();

        u.setId(rs.getInt("id"));
        u.setUsername(rs.getString("username"));
        u.setEmail(rs.getString("email"));
        u.setPassword(rs.getString("password"));
        u.setNome(rs.getString("nome"));
        u.setImmagineProfilo(rs.getString("immagine_profilo"));
        u.setCitta(rs.getString("citta"));
        u.setAzienda(rs.getBoolean("azienda"));
        u.setPersonaCognome(rs.getString("persona_cognome"));
        u.setAziendaPartitaIva(rs.getString("azienda_p_iva"));
        u.setAziendaIndirizzo(rs.getString("azienda_indirizzo"));
        u.setAziendaRecapito(rs.getString("azienda_recapito"));
        u.setPremium(rs.getBoolean("premium"));
        u.setPremiumDataInizio(rs.getString("premium_data_inizio"));
        u.setPremiumDataFine(rs.getString("premium_data_fine"));
        u.setAdmin(rs.getBoolean("admin"));
        u.setDataCreazione(rs.getString("data_creazione"));
        u.setDataUltimaModifica(rs.getString("data_ultima_modifica"));
        u.setMostraConsigliEventi(rs.getBoolean("mostra_consigli_eventi"));

        return u;
    }
}
