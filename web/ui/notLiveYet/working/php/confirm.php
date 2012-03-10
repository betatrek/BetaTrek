<?php
// Get MySQL connection
include('mysql_connection.php');
// Prepare statement to confirm an email address in the RSVP list
$confirm_statement = $mysql_conn->prepare("UPDATE rsvp_list SET confirmed=1 where id=? AND confirmed=0") or
                     die("Prepare failed: (" . $mysql_conn->errno . ") " . $mysql_conn->error);
$confirm_statement->bind_param('s', $id);

// Get the id
$id = $_GET["id"];
$confirm_statement->execute();
echo "Confirmed!";
$confirm_statement->close();
$mysql_conn->close();
?>
