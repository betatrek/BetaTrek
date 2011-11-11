package com.investub.controller;

import org.apache.log4j.Logger;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/equity")
public class EquityController {
	protected static Logger logger = Logger.getLogger("EquityController");

	@RequestMapping(value = "/getEquityForUser", method = RequestMethod.GET)
	public @ResponseBody String getEquityForUser(@CookieValue("username") String user, @RequestParam("u") String username) {
		logger.debug("Received request to get Equities");
		if (user.equals(username)){
			return ("Hello " + username +", \nYour Equities will be shown here");
		}else {
			return ("Hello " + username +", \nYou are not authrozied to make this request");	
		}
		
	}
}