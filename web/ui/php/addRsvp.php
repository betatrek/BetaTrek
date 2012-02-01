<?php session_start();
/************************************************************************
  * Responds to the Invitation Page's form action to add a new e-mail
  * address to our list of subscribed users
  ************************************************************************/
// Get the MySQL connection
include("mysql_connection.php");
// Get email function
include("email.php");
// HTTP load method
include("load.inc");
// Prepared statement to insert new email address to RSVP list
$insert_stmt = $mysql_conn->prepare("INSERT INTO rsvp_list (email,datestamp,confirmed,id) VALUES (?,?,?,?)");
if (!$insert_stmt)
	echo "Prepare failed: (" . $mysql_conn->errno . ") " . $mysql_conn->error;
$insert_stmt->bind_param('ssis', $rsvp, $datestamp, $confirm, $id);
$confirm   = FALSE;
$datestamp = date('Y-m-d');
// id is a secure and unique randomly generated identifier
$id = load('http://www.betatrek.com/betatrek/controller/id/getId');
// Prepared statement for querying whether an email address is in the RSVP list
$contains_stmt = $mysql_conn->prepare('SELECT email FROM rsvp_list WHERE email=?');
$contains_stmt->bind_param('s', $rsvp);
// Email body
$message = "<p>Hello from the BetaTrek team,<br/><br/>We are glad you have RSVPed for our product. We will update you with more information about us and let you know when we are finished preparing to help you.<p><p><a href='http://www.betatrek.com/php/confirm.php?id=" . $id . "'>Confirm email address</a><p><p>Thanks again from all of us at <a href='http://www.betatrek.com'>BetaTrek.com</a></p>";

// Grab the email address from the form data
$rsvp = $_POST['rsvp'];
$contains_stmt->execute();
$contains_stmt->store_result();
echo " # of rows: " . $contains_stmt->num_rows . " ";
if ($contains_stmt->num_rows == 0) {
	if (filter_var($rsvp, FILTER_VALIDATE_EMAIL)) {
		$_SESSION['success'] = true;
		$insert_stmt->execute();
		email($rsvp, 'support+RSVP@betatrek.com', 
		      'Betatrek RSVP Confirmation', $message, NULL, NULL,
		      TRUE);
	} else {
		$_SESSION['error'] = $rsvp . " is considered an invalid address.";
	}
} else {
	$_SESSION['success'] = true;
}

// Request the invitation page again, this time with the $_SESSION set
header('location: http://www.betatrek.com');
$contains_stmt->close();
$insert_stmt->close();
$mysql_conn->close();
exit;
?>
