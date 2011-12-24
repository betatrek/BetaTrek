package com.betatrek.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.betatrek.domain.User;
import com.betatrek.service.UserService;

/**
 * Handles and retrieves user request
 */
@Controller
@RequestMapping("/user")
public class UserController {

	protected static Logger logger = Logger.getLogger("UserController");

	@Resource(name="userService")
	private UserService userService;

	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public @ResponseBody boolean addUser(
			@RequestParam("email") String username, 
			@RequestParam("password") String password, 
			@RequestParam("country") String country,
			@RequestParam("zipcode") String zipcode
			) {

		logger.debug("Received request to add new user");
		try {
			//TODO: Data validation
			User user = new User();
			user.setCountry(country);
			user.setEmailAddress(username);
			user.setPassword(password);
			user.setZipCode(zipcode);
			// Call UserService to do the actual adding
			return userService.add(user);
		} catch (Exception ex){
			return false;
		}
	}

	@RequestMapping(value = "/getUser/{name}", method = RequestMethod.GET)
	public @ResponseBody User getUserWithPathVariable(@PathVariable("name") String name) {

		logger.debug("Received request to get user");
		// Call UserService to get the User object of that name, if one exists
		return userService.get(name);
	}

}
