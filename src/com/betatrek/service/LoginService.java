package com.betatrek.service;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.betatrek.domain.User;

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
