<?php
// Get MySQL connection
include('mysql_connection.php');
// Get Bcrypt one-way encryption algorithm
include('bcrypt.php');

// Start a session
session_start();

$form_button_name = 'login';
$form_button_value = 'login';

$_SESSION['action'] = $form_button_value;

// Prepared statement to verify a email/password pair is associated with a valid user
$select_statement = $mysql_conn->prepare("SELECT (id,password,confirmed) FROM users WHERE email=?") or
                     die("Prepare failed: (" . $mysql_conn->errno . ") " . $mysql_conn->error);
$select_statement->bind_param('s', $email);
// Prepared statement to update a valid user to facilitate a password reset
$update_statement = $mysql_conn->prepare("UPDATE users SET reset=? WHERE id=? AND reset=NULL");


if (isActiveAccount($id)) {
	// Protect against session fixation attacks
	session_regenerate_id(true);
	// set variables in the session
	$_SESSION['id'] = $id;
	$_SESSION['HTTP_USER_AGENT'] = $bcrypt->encrypt($_SERVER['HTTP_USER_AGENT']);
}

// Close the MySQL connection
$select_statement->close();
$update_statement->close();
$mysql_conn->close();

/**
 * Confirms that the attempted login is to a valid user in our database. If the user is requesting
 * a password reset and has a confirmed email address, then it continues the reset process and
 * returns false.
 * @param $id A reference to store the ID of the user upon success to pass to method caller
 */
function isActiveAccount($id) {
	global $form_button_name, $form_button_value, $bcrypt;
	global $email, $password;
	$is_active_account = false;
	// Make sure POST data is valid
	if ($_POST[$form_button_name] == $form_button_value) {
		// Grab the form input data
		$email = $_POST['email'];
		$password = $_POST['password'];
		$password_reset_request = $_POST['password_reset'];
		// If it is a password reset request, handle password resetting
		if ($password_reset_request) {
			$_SESSION['action'] = 'password reset';
			$is_in_database = isInDatabase($id, $stored_password, $confirmed);
			if ($is_in_database && $confirmed) {
				$update_statement->execute();
				if ($update_statement->affected_rows) {
					$_SESSION['message'] = "We believe a message was already sent to " . 
					                       $email . ".";
				} else {
					$_SESSION['message'] = "An email containing the password reset link will " .
										   "be sent out to " . $email . " if we have a user " .
									       "associated with that email address.";
				}
			}
		// Otherwise it is a login request
		} else {
			$is_in_database = isInDatabase($id, $stored_password, $confirmed);
			if ($is_in_database && $confirmed) {
				$bcrypt->verify($password, $stored_password);
				$is_active_account = true;
			} else if ($is_in_database) {
				$_SESSION['message'] = "Please check your email to confirm your email address.";
			} else {
				$_SESSION['message'] = "We do not know a user by that email address and password.";
			}
		}
	} 
	
	return $is_active_account;
}

/**
 * Performs a query to check that a email/password pair is in our database.
 * @param $id A reference to store the ID of the user to pass to the method caller
 * @param $stored_password A reference to store the password retrieved from the database to pass to the method caller
 * @param $confirmed A reference to store the confirmation status of the email address to pass to the method caller
 */
function isInDatabase($id, $stored_password, $confirmed) {
	global $select_statement;
	$select_statement->execute();
	$select_statement->bind_result($id, $stored_password, $confirmed);
	return $select_statement->fetch();
}
?>