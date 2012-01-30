<?php
function email($sendto, $sendfrom, $subject, $message, $ccto = NULL, $bccto = NULL, $html_message = FALSE) {
	$header  = 'From: ' . $sendfrom . "\r\n"; 
	$header .= 'Reply-to: ' . $sendfrom . "\r\n"; 
	if (html_message) {
		$header .= 'MIME-Version: 1.0' . "\r\n";
		$header .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	}
	if (!is_null(ccto)) {
		$header .= 'Cc: ' . $ccto . "\r\n";
	}
	if (!is_null(bccto)) {
		$header .= 'Bcc: ' . $bccto . "\r\n";
	}
	// This is the function to send the email 
	mail($sendto, $subject, $message, $header);  
}
?>
