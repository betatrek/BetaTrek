<?php require_once("http://localhost:8087/php/Java.inc");

$world = new java("HelloWorld");
echo $world->hello(array("from PHP"));
?>
