package com.betatrek.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.betatrek.service.UniqueIdentifierGenerator;

/**
 * Handles and retrieves RSVP requests
 */
@Controller
@RequestMapping("/id")
public class UniqueIdentifierGeneratorController {

    protected static Logger logger = Logger.getLogger("UniqueIdentiferGenerator");
    @Resource(name="uniqueIdentifierGenerator")
    private UniqueIdentifierGenerator id_generator;
    
    @RequestMapping(value = "/getId", method = RequestMethod.POST)
    public @ResponseBody String getId() {
        logger.debug("Received request to get new ID");
        try {
            return id_generator.getNextId().toString();
        } catch (Exception ex) {
            String error = ex.getCause() + "<br /><br />";
            StackTraceElement[] stack_trace = ex.getStackTrace();
            for (StackTraceElement trace : stack_trace)
                error += trace + "<br />";
            return error;
        }
    }

   @RequestMapping(value = "/addId", method = RequestMethod.POST)
   public @ResponseBody String putId(@RequestParam("id") String id) {
        logger.debug("Adding id: " + id);
        try {
            id_generator.addId(id);
            return "Successful";
        } catch (Exception ex) {
            String error = ex.getCause() + "<br /><br />";
            StackTraceElement[] stack_trace = ex.getStackTrace();
            for (StackTraceElement trace : stack_trace)
                error += trace + "<br />";
            return error;
        }
   }
}
