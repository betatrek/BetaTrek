package com.betatrek.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Date;
import java.util.Map;
import java.util.HashMap;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.betatrek.domain.Rsvp;

@Service("userService")
@Transactional
public class RsvpService {

    protected static Logger logger = Logger.getLogger("service");
    private static final String EMAIL_DEBUG   = "email = %s";
    private static final String DATE_DEBUG    = "datestamp = %s";
    private static final String CONFIRM_DEBUG = "confirm = %s";
    private static final String ID_DEBUG      = "id = %s";
    private static final String INSERT_COMMAND =
        "INSERT INTO rsvp(email,datestamp,confirm,id) VALUES (:email,:datestamp,:confirm,:id)";
    private static final String SELECT_EMAIL_COMMAND =
        "SELECT * FROM rsvp WHERE email = ?";
    
    private SimpleJdbcTemplate jdbcTemplate;
    
    @Resource(name="dataSource")
    public void setDataSource(DataSource dataSource) {
        jdbcTemplate = new SimpleJdbcTemplate(dataSource);
    }
    
    // Map a SQL result to a Java object
    protected static RowMapper<Rsvp> mapper = new RowMapper<Rsvp>(){
        public Rsvp mapRow(ResultSet result, int row_number) 
            throws SQLException {
            Rsvp rsvp = new Rsvp();
            rsvp.setEmail(result.getString("email"));
            rsvp.setDatestamp(result.getDate("datestamp"));
            rsvp.setConfirm(result.getBoolean("confirm"));
            rsvp.setId(result.getString("id"));
            logger.debug(String.format(EMAIL_DEBUG, email));
            logger.debug(String.format(DATE_DEBUG, datestamp));
            logger.debug(String.format(CONFIRM_DEBUG, confirm));
            logger.debug(String.format(ID_DEBUG, id));
            return rsvp;
        }
    };
                         
    public boolean add(Rsvp rsvp) {
        if (isAlreadyRsvped(rsvp)) return false;

        logger.debug("Adding a new rsvp");
        String email = rsvp.getEmail();
        Date datestamp = rsvp.getDatestamp();
        boolean confirm = rsvp.getConfirm();
        String id = rsvp.getId();

        // Assign values to parameters
        Map<String,Object> parameters = new HashMap<String,Object>();
        parameters.put("email", email);
        parameters.put("datestamp", datestamp);
        parameters.put("confirm", confirm);
        parameters.put("id", id);

        jdbcTemplate.update(sql, parameters);
        return true;
    }

    public boolean isAlreadyRsvped(Rsvp rsvp) {
        String email = rsvp.getEmail();
        try {
            Rsvp existing_rsvp = (Rsvp)jdbcTemplate.queryForObject(sql, mapper,
                                                    new Object[]{email});
            if (existing_rsvp == null) return false;
            // Otherwise the RSVP does already exist
            return true;
        } catch (EmptyResultDataAccessException ex) {
            return false;
        }
    }

    public boolean isConfirmed(Rsvp rsvp) {
        return rsvp.getConfirm();
    }
}