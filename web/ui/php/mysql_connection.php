<?php
/*********************************************************
 * Establishes a connection to the MySQL database "mydb"
 *********************************************************/
$mysql_conn = mysql_connect("localhost",
			    "bettafish",
			    "mybettafishlovesdatabases");
if (!$mysql_conn) {
   die('Could not connect: ' . mysql_error());
}
else {
  print "Successfully connected\n";
}

?>