package com.betatrek.service;

import java.util.regex.Pattern;

public class EmailValidator {

    private static final String LOCAL_PART_SYNTAX =
        "^((\\w|\\d|[!#$%&'*+\\-/=?^`{}|~]|\\.\"(\\w|\\d|[!#$%&'*+\\-/=?^`{}|~]|[(),:;<>@[]|\\]|\\\\( |\"|\\\\))*\"\\.|\\.)+(?<!\\.)|\"(\\w|\\d|[!#$%&'*+\\-/=?^`{}|~]|[(),:;<>@[]|\\]|\\\\( |\"|\\\\))*\")";
    private static final String DOMAIN_PART_SYNTAX =
        "[a-zA-Z0-9\\-]{1,63}(?<!-)(\\.[a-zA-Z0-9\\-]{1,63}(?<!-))*";
    private static final String EMAIL_SYNTAX = LOCAL_PART_SYNTAX + "@" 
                                               + DOMAIN_PART_SYNTAX;
    /** Precompiled pattern to match {@value #EMAIL_SYNTAX} */
    private static final Pattern validEmail = Pattern.compile(EMAIL_SYNTAX);
    
    public static boolean isValid(String email) {
        return validEmail.matcher(email).matches();
    }
}
