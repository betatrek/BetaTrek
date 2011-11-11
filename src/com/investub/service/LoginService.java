package com.investub.service;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.investub.domain.User;

@Service("loginService")
public class LoginService {
	protected static Logger logger = Logger.getLogger("LoginService");

	@Resource(name="userService")
	private UserService userService;
	
    public boolean login(String email, String password) {
    	logger.debug(email+" "+password);
    	User user = new User();
    	user.setEmailAddress(email);
    	user.setPassword(password);
    	if (userService.isValidUser(user))
    		return true;
    	else
    		return false;
    }
    
    public boolean logout(String email, String password) {
    	logger.debug(email+" "+password);
    	User user = new User();
    	user.setEmailAddress(email);
    	user.setPassword(password);
    	if (userService.isValidUser(user))
    		return true;
    	else
    		return false;
    }
    
    public void signUp(User user){
    	userService.add(user);
    }
}
