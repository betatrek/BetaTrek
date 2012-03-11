<?php
// Get Bcrypt one-way encryption algorithm
include('bcrypt.php');

/** 
 * Makes sure a user has signed in before allowing them to see a page that requires a user to
 * be signed in. If they are not signed in, redirects them to the login screen.
 */
function page_protect() {
	session_start();
	
	global $bcyrpt;
	/* Secure against Session Hijacking by confirming user agent */
	if (isset($_SESSION['HTTP_USER_AGENT']) && 
		!$bcyrpt->verify($_SESSION['HTTP_USER_AGENT'], $_SERVER['HTTP_USER_AGENT'])) {
			logout();
			exit;
	}
}

function logout() {
	session_start();
	unset($_SESSIOIN['id']);
	unset($_SESSION['HTTP_USER_AGENT']);
	session_unset();
	session_destroy();
	
	// Return to login page
	header("Location: http://www.betatrek.com");
}
?>