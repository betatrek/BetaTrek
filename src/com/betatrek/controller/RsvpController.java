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

import com.betatrek.domain.Rsvp;
import com.betatrek.service.UniqueIdentifierGenerator;
import com.betatrek.service.EmailValidator;

/**
 * Handles and retrieves RSVP requests
 */
@Controller
@RequestMapping("/rsvp")
public class RsvpController {

    protected static Logger logger = Logger.getLogger("RsvpController");
    
    @Resource(name="RsvpService")
    @Resource(name="UniqueIdentifierGenerator")
    private RsvpService rsvp_service;
    private UniqueIdentifierGenerator id_generator;
    
    @RequestMapping(value = "/addRsvp", method = RequestMethod.POST)
    public @ResponseBody boolean addRsvp(
        @RequestParam("rsvp") String email) {
        logger.debug("Received request to add new RSVP");
        try {
            if (!EmailValidator.isValid(email)) return false;
            Rsvp rsvp = new Rsvp();
            rsvp.setEmail(email);
            rsvp.setDatestamp(new Date());
            rsvp.setConfirm(false);
            rsvp.setId(id_generator.getNextId());
            return rsvp_service.add(rsvp);
        } catch (Exception ex) {
            return false;
        }
    }
}
