package com.investub.controller;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.investub.service.LoginService;

@Controller
@RequestMapping("/login")
public class LoginController {

	@Resource(name="loginService")
	LoginService loginService;

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public String login(@RequestParam("u") String username,
			@RequestParam("p") String password, HttpServletRequest request, HttpServletResponse response) {
		if (loginService.login(username, password)){
			request.getSession().setAttribute("username", username);
			return "Login Successful";
		}else
			return "Login Not Successful";
	}

	@RequestMapping(value = "/isLoggedIn",method = RequestMethod.GET)
	@ResponseBody
	public boolean isLoggedIn(@RequestParam("u") String username, HttpServletRequest request, HttpServletResponse response) {
		if (request.getSession().getAttribute("username")!=null && request.getSession().getAttribute("username").equals(username))
			return true;
		return false;
	}
	
	@RequestMapping(value = "/logout",method = RequestMethod.GET)
	@ResponseBody
	public String logout(@RequestParam("u") String username, HttpServletRequest request, HttpServletResponse response) {
		try {
			request.getSession().invalidate();
			return "Successfully logged out";
		}catch (Exception ex){
			return "Logging out unsuccessfull";
		}
	}
}
