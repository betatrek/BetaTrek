<?php

// get the contents of a web page
function file_get_the_contents($url) {
  $ch = curl_init();
//  $timeout = 10; // set to zero for no timeout
  curl_setopt ($ch, CURLOPT_URL, $url);
  curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
  $file_contents = curl_exec($ch);
  curl_close($ch);
  return $file_contents;
}

function strposOffset($search, $string, $offset)
{
    /*** explode the string ***/
    $arr = explode($search, $string);
    /*** check the search is not out of bounds ***/
    switch( $offset )
    {
        case $offset == 0:
        return false;
        break;
    
        case $offset > max(array_keys($arr)):
        return false;
        break;

        default:
        return strlen(implode($search, array_slice($arr, 0, $offset)));
    }
}


$link = 'http://finance.yahoo.com/q?s=HPQ';

// Capture data and display value.
$text = file_get_the_contents($link) ; // copy entire page into variable

$start_index = strposOffset('<h2>', $text, 3);
$end_index = strpos($text, '</h2>', $start_index);
$start_index = $start_index + 4;
$display_val = $end_index - $start_index;

$name = substr($text, $start_index, $display_val);
echo "Name of the company is - ".$name;


$start_index = strpos($text, '<td class="yfnc_tabledata1">');
$end_index = strpos($text, '</td>', $start_index);
$start_index = $start_index + 28; // static value, recognized from pattern
$display_val = $end_index - $start_index;

$rate = substr($text, $start_index, $display_val);
echo "Current Stock is - ".$rate;

?>