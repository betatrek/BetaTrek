package com.betatrek.domain;

import java.io.Serializable;

/**
 * A simple POJO representing a User
 */
@SuppressWarnings("serial")
public class User implements Serializable {

	private Integer userId;
	private String name;
	private String password;
	private String emailAddress;
	private String country;
	private String address;
	private String phone;
	private String state;
	private String zipcode;
	
	private boolean logged_in = false;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isLogged_in() {
		return logged_in;
	}

	public void setLogged_in(boolean logged_in) {
		this.logged_in = logged_in;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
	public String getZipCode() {
		return zipcode;
	}
	public void setZipCode(String zipcode) {
		this.zipcode = zipcode;
	}
}
