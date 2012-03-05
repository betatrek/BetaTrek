<?php
/*********************************************************
 * Establishes a connection to the MySQL database "mydb"
 *********************************************************/
$mysql_conn = new mysqli('localhost',
                         'bettafish',
                         'mybettafishlovesdatabases',
                         'mydb') 
              or die('There was a problem connecting to the database');  
if ($mysql_conn->connect_errno)
        echo "Failed to connect to MySQL: (" . $mysql_conn->connect_errno . ") " . $mysql_conn->connect_error;
?>
