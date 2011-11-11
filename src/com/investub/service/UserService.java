package com.investub.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.investub.domain.User;
import com.investub.service.BCrypt;

@Service("userService")
@Transactional
public class UserService {

	protected static Logger logger = Logger.getLogger("service");

	private SimpleJdbcTemplate jdbcTemplate;

	@Resource(name="dataSource")
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new SimpleJdbcTemplate(dataSource);
	}

	// Maps a SQL result to a Java object
	protected static RowMapper<User> mapper = new RowMapper<User>() {  
		public User mapRow(ResultSet rs, int rowNum) throws SQLException {
			User user = new User();
			user.setUserId(rs.getInt("user_id"));
			user.setName(rs.getString("name"));
			logger.debug("userid="+user.getUserId());
			logger.debug("name="+user.getName());
			return user;
		}
	};

	public boolean add(User user) {
		logger.debug("Adding new user");
		String sql = "insert into user(password, email_address, country, state) values " +
		"(:password, :email_address, :country, :state)";

		// Encrypts the user's password using JCrypt encryption
		String email = user.getEmailAddress();
		String password = user.getPassword();
		password = BCrypt.hashpw(password, BCrypt.gensalt(12));
		
		// Assign values to parameters
		Map<String, Object> parameters = new HashMap<String, Object>();
		parameters.put("password", password);
		parameters.put("email_address", password);
		parameters.put("country", user.getCountry());
		parameters.put("state", user.getState());

		if (!isExistingUser(user)) {
			jdbcTemplate.update(sql, parameters);
			return true;
		}
		return false;
	}

	public User getUser(String email, String password) {
		logger.debug("Retrieving user: " + email);
		// Prepare our SQL statement
		String sql = "select * from user where email_address = ? and password = ?"; 
		// Retrieve user
		try {
			return (User)jdbcTemplate.queryForObject(sql, mapper, new Object[]{email, password});
		}catch (EmptyResultDataAccessException ex){
			return null;
		}

	}

	//Checks whether previously existed user or not
	public boolean isExistingUser(User user){
		String email = user.getEmailAddress();
		//make a db call here to see whether the user exist
		String sql = "select * from user where email_address = ? "; 
		// Retrieve user
		try {
			User u = (User)jdbcTemplate.queryForObject(sql, mapper, new Object[]{email});
			if (u!=null)
				return true;
			else
				return false;
		}catch (EmptyResultDataAccessException ex){
			return false;
		}
	}

    // Get the hashed password associated with an email address
    public String getPassword(String email) {
        String password;
        // make a db call here to retrieve the password
        String sql = "select password from user where email_address = ?";
        // Retrieve password
        try {
            User u = (User)jdbcTemplate.queryForObject(sql, mapper, new Object[]
                {email});
            if (u != null)
                return u.getPassword();
            else
                return null;
        } catch (EmptyResultDataAccessException ex) {
            return false;
        }
    }   

	//Checks whether password matches with the passed user
	public boolean isValidUser(User user){
		String email = user.getEmailAddress();
		String password = user.getPassword();
        String hash_pw = getPassword(email);
        if (BCrypt.checkpw(password, hash_pw))
			return true;
		else
			return false;
	}
}