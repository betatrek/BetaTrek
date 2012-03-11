<?php
// Get MySQL connection
include('mysql_connection.php');
// Get Bcrypt one-way encryption algorithm
include('bcrypt.php');
// Get HTTP requesting
include('load.inc');

// Start a session
session_start();

$form_button_name = 'create';
$form_button_value = 'create';

// Prepared statement to verify a email address is available
$select_statement = $mysql_conn->prepare("SELECT (id) FROM users WHERE email=?") or
                    die("Prepare failed: (" . $mysql_conn->errno . ") " . $mysql_conn->error);
$select_statement->bind_param('s', $email);
// Prepared statement to insert a new user into the database
$insert_statement = $mysql_conn->prepare("INSERT INTO users (email,password,country,state,id,datestamp) VALUES (?,?,?,?,?,?)") or
                    die("Prepare failed: (" . $mysql_conn->errno . ") " . $mysql_conn->error);
$insert_statement->bind_param('ssssss', $email, $password, $country, $state, $id, $datestamp);

if (isAvailable($id)) {
	// Protect against session fixation attacks
	session_regenerate_id(true);
	// set variables in the session
	$_SESSION['id'] = $id;
	$_SESSION['HTTP_USER_AGENT'] = $bcrypt->encrypt($_SERVER['HTTP_USER_AGENT']);
	header('location: ../portfolio_creation.html');
} else {
	header('location: ../signup.php');
}

// Close the MySQL connection
$select_statement->close();
$insert_statement->close();
$mysql_conn->close();
exit;

/**
 * Confirms that the attempted new account doesn't conflict with an existing account.
 * @param $id A reference to store the ID of the user upon success to pass to method caller
 */
function isAvailable($id) {
	global $form_button_name, $form_button_value, $insert_statement;
	$is_available = false;
	// Make sure POST data is valid
	if ($_POST[$form_button_name] == $form_button_value) {
		// Grab the form input data
		$email = $_POST['email'];
		$password = $_POST['password'];
		$country = $_POST['country']; 
		$state = $_POST['state'];
		$agree_with_tos = $_POST['agree'];
		// If user agrees with your Terms of Service
		if ($agree_with_tos) {
			// Confirm the email doesn't conflict with that of an existing user
			if (isInDatabase($id))
				$_SESSION['message'] = "That email address conflicts with one of an existing user.";
			else {
				$datestamp = date('Y-m-d');
				// id is a secure and unique randomly generated identifier
				$id = load('http://www.betatrek.com/betatrek/controller/id/getId');
				$insert_statement->execute();
				if ($insert_statement->affected_rows > 0) {
					//TODO: send email confirmation link and update database
					$is_available = true;
				} else {
					$_SESSION['message'] = "Sorry, we incountered an issue creating this new account, " .
					                       "please try again later.";
					// TODO: maybe log information about this if it ever occurs?
				}
			}
		// Otherwise tell user to agree before continuing
		} else {
			$_SESSION['message'] = "We require that you agree to the Terms of Service before continuing.";
		}
	} 
	
	return $is_available;
}

/**
 * Performs a query to check that a email is in our database.
 * @param $id A reference to store the ID of the user to pass to the method caller
 */
function isInDatabase($id) {
	global $select_statement;
	$select_statement->execute();
	$select_statement->bind_result($id);
	return $select_statement->fetch();
}
?>