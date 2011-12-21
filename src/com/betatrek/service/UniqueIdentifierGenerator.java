package com.betatrek.service;

import java.security.SecureRandom;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.utils.HashSet;
import java.utils.Set;

/**
 * This class maintains a generator that can produce unique and secure random
 * identifiers.
 */
public class UniqueIdentifierGenerator {
    private SecureRandom prng;
    private Set used_ids;
    
    /**
     * Sets up the generator to produce secure, unique, random
     * IDs
     */
    public UniqueIdentifierGenerator() {
        prng = SecureRandom.getInstance("SHA1PRNG");
        used_ids = new HashSet();
    }
    
    /**
     * Generates a unique and secure ID to be identify a user while making
     * it difficult to predict or forge the ID
     * @return random hexidecimal identifier that has not used already
     */
    public static String getNextId() {
        while (true) {
            try {
                // generate a random number
                String randomNum = new Integer(prng.nextInt()).toString();
                
                // get its digest
                byte[] result = MessageDigest.getInstance("SHA-1").digest(
                                    randomNum.getBytes());
                
                String id = hexEncode(result);
            } catch (NoSuchAlgorithmException ex) {
                System.err.println(ex);
            }
            if (!used_ids.contains(id)) {
                used_ids.add(id);
                return id;
            }
        }
    }
    
    /**
     * The byte[] returned by MessageDigest does not have a nice
     * textual representation, so some form of encoding is usually performed.
     *
     * This implementation follows the example of David Flanagan's book
     * "Java In A Nutshell", and converts a byte array into a String
     * of hex characters.
     *
     * Another popular alternative is to use a "Base64" encoding.
     * @return hexidecimal encoding of the given bytes
     */
    static private String hexEncode( byte[] aInput){
        StringBuilder result = new StringBuilder();
        char[] digits = {'0', '1', '2', '3', '4','5','6','7','8','9','a','b','c','d','e','f'};
        for ( int idx = 0; idx < aInput.length; ++idx) {
            byte b = aInput[idx];
            result.append( digits[ (b&0xf0) >> 4 ] );
            result.append( digits[ b&0x0f] );
        }
        return result.toString();
    }
} 
