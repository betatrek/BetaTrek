<!DOCTYPE HTML>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>betatrek > set up > create account</title>

<meta name="description" content="betatrek provides algorithmic investment advice and portfolio management to consumers. Create an account here.">
<meta name="author" content="Dandre Allison">
<link rel="stylesheet" type="text/css" media="all"  href="css/libraries.css" />
<link rel="stylesheet" type="text/css" media="all"  href="css/template.css" />
<!--<link rel="stylesheet" type="text/css" media="all"  href="css/template_debug.css" /> -->
<link rel="stylesheet" type="text/css" media="all" href="css/grids.css" />
<link rel="stylesheet" type="text/css" media="all" href="css/content.css" />
<link rel="stylesheet" type="text/css" media="all" href="css/mod.css" />
<link rel="stylesheet" type="text/css" media="all" href="css/mod_skins.css" />

<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="css/style.css" rel="stylesheet" type="text/css" />
<!--[if lte IE 7]> 
    <style>
        .content { margin-right: -1px} /* this 1px negative margin can be placed on any of the columns in this layout with the same corrective effect. */
        ul.nav a { zoom: 1}  /* the zoom property gives IE the hasLayout trigger it needs to correct extra whitespace between the links */
    </style>
    <![endif]-->
<script src="js/libs/modernizr-2.0.6.min.js"></script>
<?php
// Get MySQL connection
include('php/mysql_connection.php');
// Get Bcrypt one-way encryption algorithm
include('php/bcrypt.php');
// Get HTTP requesting
include('php/load.inc');

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
	// Start a session
	session_start();
	// Protext against session fixation attacks
	session_regenerate_id(true);
	// set variables in the session
	$_SESSION['id'] = $id;
	$_SESSION['HTTP_USER_AGENT'] = $bcrypt->encrypt($_SERVER['HTTP_USER_AGENT']);
	header('location: portfolio_creation.html');
} else {
	//header('location: ../signup.php');
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
</head>

<body class="signUpPage">
<div class="page liquid">
    <!-- Header Bar -->
	<div class="head">
		<!-- Line -->
	    <div class="line betatrekHead">
	    	<!-- Logo of Header Bar -->
			<div class="unit betatrekLogo">
		    	<a class="betatrekLink" href="">betatrek</a>
			</div>
			<!-- end Logo of Header Bar -->
			<!-- First Button of Header Bar -->
        	<div class="unit unitExt">
                <a class="betatrekLink" href="" id="login_button">
		        	<div class="ovalContainer ovalButton">
						<div class="inner">
							sign in
						</div>
						<!-- end inner -->
					</div>
					<!-- end Oval Button -->
                </a>
			</div>
			<!-- end First Button of Header Bar -->
			<!-- Second Button of Header Bar -->
        	<div class="unit unitExt">
                <a class="betatrekLink" href="#signup">
		        	<div class="ovalContainer ovalButton">
						<div class="inner">
							register
						</div>
						<!-- end inner -->
					</div>
					<!-- end Oval Button -->
                </a>
			</div>
			<!-- end Second Button of Header Bar -->
		</div>
		<!-- end Line -->
	</div>
	<!-- end Header Bar -->
	
	<!-- Progress Bar -->
	<div class="cf">
    <div class="progress step1">
    	<div class="triangle arrowTail"></div>
        <span class="first description Helvectica">1. Create Account</span>
        <div class="triangle firstArrowhead"></div>
        <span class="second description Helvectica">2. Input Assets</span>
        <div class="triangle secondArrowhead"></div>
        <span class="third description Helvectica">3. Select Risks</span>
        <div class="triangle thirdArrowhead"></div>
    </div>
	</div>
	<!-- end .progress -->
    <!-- end Progress Bar -->

	<!-- Body -->
	<div class="body signupBackgroundColor">
		<div class="main signupBackground">
			<!-- For the screen readers -->
			<p class="visuallyhidden">Algorithmic advice no matter the class.</p>
				<?php session_start(); ?>
				<p class="whiteAndShadowed"><?php echo "PHP: "; echo $_POST['message']; ?></p>
				<?php if ($_SESSION['message']): ?>
				<p><?php echo $_SESSION['message']; ?></p>
				<?php endif; ?>
			<!-- Sign up form -->
			<form id="signup" class="signupFormPosition" action="">
				<p class="visuallyhidden">Begin Here</p>
				<label for="email" class="labelWithReplacement whiteAndShadowed">
					Email <br />
				</label>
                <input type="email" name="email"
                       class="defaultInputField niceVerticalSpacing" 
					   id="signup_email" placeholder="email" />
				<label for="password" class="labelWithReplacement whiteAndShadowed">
					Password <br />
				</label>
                <input type="password" name="password"
                       class="defaultInputField niceVerticalSpacing" 
                       id="signup_password" maxlength="24" placeholder="password" />
                <button type="submit" name="creation" 
                        class="formActionButton niceVerticalSpacing"
						id="begin_account_creation">
						Begin!
				</button>
            </form>	
			<!-- end Sign up form -->
			
			<!-- account sign in window -->
			<div id="login" class="modal">
			<div class="content modalWindowPosition blackWithClearBorder">
				<div class="betatrekHead betatrekLogo">
				    <a class="betatrekLink" href="">betatrek</a>
				</div>
                <form id="sign_into_account" method="post" action="php/login.php"
					  class="modalFormPosition">
					<span class="whiteAndShadowed niceVerticalSpacing" id="login_title">
						  Sign into an Account
					</span> <br />
					<label for="email" class="labelWithReplacement whiteAndShadowed">
						Email <br />
					</label>
                    <input type="email" id="login_email"
                           class="defaultInputField niceVerticalSpacing" 
						   placeholder="email"
						   name="email" required /> <br />
					<label for="password" class="labelWithReplacement whiteAndShadowed">
						Password <br />
					</label>
                    <input type="password" id="login_password"
						   class="defaultInputField niceVerticalSpacing" 
						   placeholder="password"
						   name="password" maxlength="24" required /> 
					<br id="space_after_login_password" />
					<input type="hidden" id="password_reset_request" value=false
						   name="password_reset_request" />
					<a href="tou.html" id="password_reset" title="Request password reset">
						Request password reset
					</a> 
					<br id="space_after_password_reset" />
					<a href="#close" class="close" title="Close" id="login_close">
					<span class="link">Cancel</span>
					</a>
                    <button type="submit" name="login" value="login" 
							class="formActionButton niceVerticalSpacing">
						Create Account
					</button>
				</form>
			</div>
			</div>
			<!-- end account sign in window -->
			
			<!-- creation window -->
            <div id="creation" class="modal">
	 		<div class="content modalWindowPosition blackWithClearBorder">
				<div class="betatrekHead betatrekLogo">
				    <a class="betatrekLink" href="">betatrek</a>
				</div>
                <form id="create_account" method="post" action="php/create_account.php"
					  class="modalFormPosition">
					<span class="whiteAndShadowed niceVerticalSpacing">
						  Create a New Account
					</span> <br />
					<label for="email" class="labelWithReplacement whiteAndShadowed">
						Email <br />
					</label>
                    <input type="email" id="creation_email"
                           class="defaultInputField niceVerticalSpacing" 
						   placeholder="email" tabindex="2"
						   name="email" required /> <br />
					<label for="password" class="labelWithReplacement whiteAndShadowed">
						Password <br />
					</label>
                    <input type="password" id="creation_password"
						   class="defaultInputField niceVerticalSpacing" 
						   placeholder="password" tabindex="3"
						   name="password" maxlength="24" required /> <br />
                    <select data-placeholder="Choose a country..." 
							class="defaultInputField niceVerticalSpacing chzn-select" 
							tabindex="4"
							name="country" required>
							<option selected disabled>
								choose a country...
							</option>
							<option>United States of America</option>
							<option disabled>Others not yet supported</option>
					</select> <br />
                    <select data-placeholder="Choose a state..." 
							class="defaultInputField niceVerticalSpacing chzn-select"
							tabindex="5"
							name="state" required>
							<option value='' selected disabled>
								choose a state...
							</option>
							<option>California</option>
					</select> <br />
                    <input type="checkbox" name="agree"
 							tabindex="6" required />
                    <label for="agree" class="helvetica whiteAndShadowed">
                        Yes, I agree to the betatrek
                        <a href="tou.html">Terms of Use</a>
                    </label> <br />
					<a href="#close" class="close" title="Close" tabindex="8">
						<span class="link">Cancel</span>
					</a>
                    <button type="submit" name="create" value="create"
							class="formActionButton niceVerticalSpacing"
							tabindex="7">
						Create Account
					</button>
                </form>
			</div>
			</div>
			<!-- end creation window -->
		</div>
	</div>
	<!-- end Body -->	
</div>

<!-- Scripts -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script>

    <!-- scripts concatenated and minified via ant build script-->
    <script src="js/plugins.js"></script>
    <script src="js/script.js"></script>
    <!-- end scripts-->

    <script>
        var _gaq=[['_setAccount','UA-27225736-1'],['_trackPageview']]; // Change UA-XXXXX-X to be your site's ID
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>

    <!--[if lt IE 7 ]>
        <script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.2/CFInstall.min.js"></script>
        <script>window.attachEvent("onload",function(){CFInstall.check({mode:"overlay"})})</script>
    <![endif]-->
</body>
</html>
