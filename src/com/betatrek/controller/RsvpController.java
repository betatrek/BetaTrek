package com.betatrek.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Date;
import java.util.Calendar;

import com.betatrek.domain.Rsvp;
import com.betatrek.service.UniqueIdentifierGenerator;
import com.betatrek.service.EmailValidator;
import com.betatrek.service.RsvpService;

/**
 * Handles and retrieves RSVP requests
 */
@Controller
@RequestMapping("/rsvp")
public class RsvpController {

    protected static Logger logger = Logger.getLogger("RsvpController");
    
    @Resource(name="rsvpService")
    private RsvpService rsvp_service;
    @Resource(name="uniqueIdentifierGenerator")
    private UniqueIdentifierGenerator id_generator;
    
    @RequestMapping(value = "/addRsvp", method = RequestMethod.POST)
    public @ResponseBody String addRsvp(
        @RequestParam("rsvp") String email) {
        logger.debug("Received request to add new RSVP");
        try {
            if (!EmailValidator.isValid(email)) return "invalid email false: " + email;
            Rsvp rsvp = new Rsvp();
            rsvp.setEmail(email);
            Calendar cal = Calendar.getInstance();
            cal.set( cal.HOUR_OF_DAY, 0 );
            cal.set( cal.MINUTE, 0 );
            cal.set( cal.SECOND, 0 );
            cal.set( cal.MILLISECOND, 0 );
            rsvp.setDatestamp(new Date(cal.getTime().getTime()));
            rsvp.setConfirm(false);
            rsvp.setId(id_generator.getNextId());
            return email + " " + rsvp.getDatestamp() + " " +rsvp_service.add(rsvp);
        } catch (Exception ex) {
            return "error false";
        }
    }
}
