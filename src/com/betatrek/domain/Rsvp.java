package com.betatrek.domain;

import java.io.Serializable;
import java.sql.Date;

/**
 * POJO representing a RSVP
 */
@SuppressWarnings("serial")
public class Rsvp implements Serializable {
    
    private String email;
    private Date datestamp;
    private boolean confirm;
    private String id;
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public void setDatestamp(Date datestamp) {
        this.datestamp = datestamp;
    }
    
    public void setConfirm(boolean confirm) {
        this.confirm = confirm;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public Date getDatestamp() {
        return datestamp;
    }
    
    public boolean getConfirm() {
        return confirm;
    }
    
    public String getId() {
        return id;
    }
}